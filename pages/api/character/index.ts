import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export interface CharacterBody {
  name: string;
}

interface UserApiRequest extends NextApiRequest {
  body: CharacterBody;
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
          Character: true,
        },
      });

      if (u?.Character.length) {
        if (u.Character.length > 17) {
          throw new Error(
            "Too many characters. Max of 18. Delete some any try again."
          );
        }
      }

      const otherCharNames = u?.Character.map((char) => {
        return char.name;
      });
      const { name } = req.body;

      otherCharNames?.forEach((current) => {
        if (name === current) {
          throw new Error("Character names must be unique");
        }
      });

      if ((name.length < 2 ) || (name.length > 25)) {
        throw new Error("Name must be between 2-25 characters")
      }

      const result = await prisma.character.create({
        data: {
          name: name,
          owner: { connect: { email: session?.user?.email ?? undefined } },
        },
      });

      res.json(result);
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
