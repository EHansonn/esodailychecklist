import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	//For unauthed users to get all the normal quests. If authed the /user api will eventually fetch these AND their own customized quests.
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		res.status(201);
		res.end();
		return;
	}
	try {
		const availableQuests = await prisma?.quest.findMany({});
		res.send(availableQuests);
		res.status(200);
	} catch (error) {
		res.status(500);
		if (error instanceof Error) {
			res.send(error.message);
		}
	}
	res.end();
}
