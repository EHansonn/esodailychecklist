// pages/api/post/[id].ts

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// DELETE /api/post/:id
export default async function handle(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const listId = req.query.id;
    if (req.method === "DELETE") {
      const post = await prisma.list.delete({
        where: { id: listId },
      });
      res.json(post);
  
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
