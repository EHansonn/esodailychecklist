// pages/api/post/index.ts

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../components/DailyChecklist/dailiesCheckList";

export interface ListBody {
	title: string;
	content: string;
	tasks: string[];
}

interface UserApiRequest extends NextApiRequest {
	body: ListBody;
	query: {
		id: string;
	};
}

export default async function handle(req: UserApiRequest, res: NextApiResponse) {
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
