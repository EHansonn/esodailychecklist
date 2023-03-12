// pages/api/post/[id].ts

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import { Character, Quest } from "../../yourdailies";

export interface QuestsOnCharacterBody {
  character: Character;
  quest: Quest;
  trueorfalse: boolean;
}

interface UserApiRequest extends NextApiRequest {
  body: QuestsOnCharacterBody;
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
      const { character, quest, trueorfalse } = req.body;

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
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(401);
  }
  res.end();
}
