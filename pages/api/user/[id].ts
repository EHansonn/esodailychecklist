// pages/api/post/[id].ts

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  console.log("hi world");
  if (session) {
    const { id, checkedTasks } = req.body;
    const userId = req.query.id;
    if (id !== userId) {
      throw new Error("something went wrong with ids");
    }
    console.log(`STUFF ${checkedTasks}`);
    console.log(`${id}`);
    const listId = req.query.id;
    if (req.method === "PUT") {
      //console.log("succsess");
      const stuff = await prisma.user.update({
        where: { id: userId },
        data: { checkedTasks },
      });
      res.json(stuff);
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
