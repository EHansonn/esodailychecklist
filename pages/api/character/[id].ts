import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const u = await prisma?.user.findFirst({
        where: { email: session?.user.email },
      });

      const characterValuetemp = req.query.id;

      const characterValue = Array.isArray(characterValuetemp)
        ? characterValuetemp[0]
        : characterValuetemp;
      if (req.method === "DELETE") {
        await prisma.character.deleteMany({
          where: {
            userId: u!.id,
            value: characterValue,
          },
        });

        res.status(200);
      } else {
        throw new Error(
          `The HTTP ${req.method} method is not supported at this route.`
        );
      }
    } catch (e) {
      res.status(500)
    }
  } else {
    res.status(401);
  }
  res.end();
}
