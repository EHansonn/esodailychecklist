// pages/api/post/[id].ts

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  // console.log("hi world");
  if (session) {
    const { id, checkedTasks, quest, trueorfalse } = req.body;
    const userId = req.query.id;
    // console.log(quest);
    if (id !== userId) {
      throw new Error("something went wrong with ids");
    }

    const u = await prisma?.user.findFirst({
      where: { email: session?.user.email },
    });

    if (!(u?.id === userId)) {
      throw new Error("something went wrong with the auth");
    }

    const listId = req.query.id;
    if (req.method === "PUT") {
      if (trueorfalse) {
        await prisma.questsOnUser.create({
          data: {
            userId: userId,
            questName: quest.value,
          },
        });
      } else {
        await prisma.questsOnUser.deleteMany({
          where: { questName: quest.value },
        });
      }

      // res.json(stuff);
      res.status(201);
    } else {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
    }
  } else {
    res.status(401);
  }
  res.end();
}
