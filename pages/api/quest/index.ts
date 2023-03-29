import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Quest } from "../../../components/DailyChecklist/dailiesCheckList";
export interface QuestBody {
	optionalTitle: string;
	category: string;
	description: string;
	repeatable: "daily" | "weekly";
	location: string;
	questGiver: string;
	uespLink: string;
	reward: string;
}

interface UserApiRequest extends NextApiRequest {
	body: QuestBody;
	query: {
		id: string;
	};
}
export default async function handle(req: UserApiRequest, res: NextApiResponse) {
	//For unauthed users to get all the normal quests. If authed the /user api will eventually fetch these AND their own customized quests.
	const session = await getServerSession(req, res, authOptions);
	try {
		if (req.method === "GET") {
			let availableQuests = await prisma?.quest.findMany({
				where: {
					userEmail: null,
				},
			});

			if (session) {
				const customQuests = await prisma?.quest.findMany({
					where: {
						userEmail: session.user.email,
					},
				});

				if (customQuests) {
					availableQuests = availableQuests.concat(customQuests);
				}
			}
			res.send(availableQuests);
			res.status(200);
		} else if (req.method === "POST") {
			if (!session) {
				throw new Error("Log in");
			}

			const { optionalTitle, category, description, repeatable, location, questGiver, uespLink, reward } =
				req.body;

			if (optionalTitle.length < 2 || optionalTitle.length > 50) {
				throw new Error("Name must be between 2-50 characters");
			}

			if (!category) {
				throw new Error("Must select a category");
			}

			if (!repeatable) {
				throw new Error("Must select a repeatable type");
			}

			const customQuests = await prisma?.quest.findMany({
				where: {
					userEmail: session.user.email,
				},
			});

			if (customQuests) {
				if (customQuests.length > 19) {
					throw new Error("Max of 20 custom quests");
				}
			}

			customQuests.forEach((quest) => {
				if (quest.optionalTitle === optionalTitle) {
					throw new Error("Name must be unique");
				}
			});


			if (repeatable !== "daily" && repeatable !== "weekly" ) {
				throw new Error("Invalid repeatable value");
			}
			const result = await prisma.quest.create({
				data: {
					optionalTitle: optionalTitle,
					category: category || "",
					description: description || "",
					repeatable: repeatable,
					location: location || "",
					questGiver: questGiver || "",
					uespLink: uespLink || "",
					reward: reward || "",
					owner: { connect: { email: session?.user?.email ?? undefined } },
				},
			});

			res.status(200);
		} else {
			throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
		}
	} catch (error) {
		res.status(500);
		if (error instanceof Error) {
			res.send(error.message);
		}
	}
	res.end();
}
