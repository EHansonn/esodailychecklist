// pages/api/post/index.ts

import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
// POST /api/list
// Required fields in body: title
// Optional fields in body: content

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
      const { name } = req.body;
      const result = await prisma.character.create({
        data: {
          name: name,
          owner: { connect: { email: session?.user?.email ?? undefined } },
        },
      });

      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(401);
  }
  res.end();
}
