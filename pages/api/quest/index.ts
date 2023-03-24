import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	//If we eventually get enough concurrent users, ill switch over to static props, but on the free vercel tier its not worth it when you have a small userbase imo.
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
