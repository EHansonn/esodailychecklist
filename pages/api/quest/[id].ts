import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import { QuestBody } from ".";

interface UserApiRequest extends NextApiRequest {
	body: QuestBody;
	query: {
		id: string;
	};
}

export default async function handle(req: UserApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		try {
			const questValue = req.query.id;
			const { optionalTitle } = req.body;

			if (!optionalTitle) {
				throw new Error("Needs title");
			}

			if (!session.user.email) {
				throw new Error("email wrong");
			}

			if (req.method === "DELETE") {
				await prisma.quest.deleteMany({
					where: {
						userEmail: session.user.email,
						value: questValue,
						optionalTitle: optionalTitle,
					},
				});

				res.status(200);
			} else {
				throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
			}
		} catch (e) {
			res.status(500);
		}
	} else {
		res.status(401);
	}
	res.end();
}
