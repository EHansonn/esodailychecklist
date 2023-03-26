import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

interface UserApiRequest extends NextApiRequest {
	query: {
		id: string;
	};
}

export default async function handle(req: UserApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		try {
			const u = await prisma?.user.findFirst({
				where: { email: session?.user.email },
			});

			const characterValue = req.query.id;

			if (req.method === "DELETE") {
				await prisma.character.deleteMany({
					where: {
						userId: u!.id,
						value: characterValue,
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
