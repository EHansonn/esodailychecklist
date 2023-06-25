import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

interface UserApiRequest extends NextApiRequest {
	query: {
		id: string;
	};
}

// DELETE /api/post/:id
export default async function handle(req: UserApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		res.status(401);
		res.end();
		return;
	}
	try {
		const u = await prisma?.user.findFirst({
			where: { email: session?.user.email },
		});

		const listId = req.query.id;

		if (req.method === "DELETE") {
			const post = await prisma.list.deleteMany({
				where: { id: listId, userId: u!.id },
			});

			res.json(post);
		} else {
			throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
		}

		res.status(200);
	} catch (error) {
		res.status(500);
	}
	res.end();
}
