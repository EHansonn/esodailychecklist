import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	try {
		const findNumberOfQuests = await prisma?.yourModel.findUnique({
			where: {
				id: 1,
			},
		});

		const numberOfQuests = findNumberOfQuests?.yourNumberField.toString();
		res.send(JSON.stringify({ numberOfQuests }));
	} catch (e) {
		res.status(500);
	}
	res.end();
}
