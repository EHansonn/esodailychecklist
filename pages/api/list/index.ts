// pages/api/post/index.ts

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../yourdailies";

export interface ListBody {
  title: string;
  content: string;
  tasks: string[];
  user: User;
}

interface UserApiRequest extends NextApiRequest {
  body: ListBody;
  query: {
    id: string;
  };
}

export default async function handle(
  req: UserApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const u = await prisma?.user.findUnique({
        where: { email: session?.user.email },
      });

      const { title, content, tasks } = req.body;
      // const session = await getSession({ req });
      const result = await prisma.list.create({
        data: {
          title: title,
          content: content,
          owner: { connect: { email: session?.user?.email ?? undefined } },
        },
      });
      const taskstosend = tasks.map((e: any) => ({
        listId: result.id,
        userId: u?.id,
        questName: e,
      }));
      const createTasks = await prisma.task.createMany({ data: taskstosend });
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(401);
  }
  res.end();
}
