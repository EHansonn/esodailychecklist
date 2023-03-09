import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { APP_KEY } = process.env;

  const ACTION_KEY = req?.headers?.authorization;
  try {
    if (ACTION_KEY === APP_KEY) {
      // Process the POST request
      const post = await prisma.questsOnUser.deleteMany({
        where: {
          quest: {
            repeatable: "weekly",
          },
        },
      });
      res.status(200).json({ success: "true" });
    } else {
      res.status(401);
      res.end();
    }
  } catch (err) {
    res.status(500);
    res.end();
  }
}
