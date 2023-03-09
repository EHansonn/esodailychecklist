// pages/api/post/index.ts

import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/list
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { value, name, user } = req.body;
    const result = await prisma.character.create({
      data: {
        name: name,
        owner: { connect: { email: session?.user?.email ?? undefined } },
      },
    });

    res.json(result);
  } else {
    res.status(401);
  }
  res.end();
}
