// pages/api/post/[id].ts

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// #TODO add proper types to all apis
export default async function handle(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { character } = req.body;
    const u = await prisma?.user.findFirst({
      where: { email: session?.user.email },
    });

    const { quest, trueorfalse } = req.body;

    const listId = req.query.id;
    if (req.method === "PUT") {
      if (trueorfalse) {
        await prisma.questsOnCharacter.create({
          data: {
            characterId: character!.value,
            questName: quest.value,
          },
        });
      } else {
        await prisma.questsOnCharacter.deleteMany({
          where: { questName: quest.value, characterId: character!.value },
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
