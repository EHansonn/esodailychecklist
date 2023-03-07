// pages/api/post/index.ts

import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/list
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {
  const session1 = await getServerSession(req, res, authOptions);
  if (session1) {
    const { title, content, tasks, user } = req.body;
    const session = await getSession({ req });
    const result = await prisma.list.create({
      data: {
        title: title,
        content: content,
        owner: { connect: { email: session?.user?.email ?? undefined } },
      },
    });
    const taskstosend = tasks.map((e: any) => ({
      listId: result.id,
      userId: user.id,
      questName: e,
    }));
    const createTasks = await prisma.task.createMany({ data: taskstosend });

    res.json(result);
  } else {
    res.status(401);
  }
  res.end();

  // tasks: {
  //   create: [
  //     {
  //       id: Math.random().toString(),
  //       quest: {
  //         connect: {
  //           value: "quit game",
  //         },
  //       },
  //       owner: { connect: { email: session?.user?.email ?? undefined } },
  //     },
  //     ,
  //   ],
}
