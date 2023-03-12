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
        include: {
          lists: true,
        },
      });

      if (u?.lists.length) {
        if (u.lists.length > 15) {
          throw new Error(
            "Too many lists. Max of 16, delete some and try again"
          );
        }
      }

      const { title, content, tasks } = req.body;
      const otherListTitles = u?.lists.map((list) => {
        return list.title;
      });

      otherListTitles?.forEach((current) => {
        if (title === current) {
          throw new Error("List titles must be unique");
        }
      });

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

      res.status(200);
    } catch (error) {
      res.status(500);
      if (error instanceof Error) {
        res.send(error.message);
      }
    }
  } else {
    res.status(401);
  }
  res.end();
}
