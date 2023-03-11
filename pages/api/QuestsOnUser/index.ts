// pages/api/post/[id].ts

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// #TODO add proper types to all apis
export default async function handle(req: any, res: any) {
  // //old api from before I added characters. will remove later
  res.status(401);
  res.end();
  // const session = await getServerSession(req, res, authOptions);
  // //console.log("helloo");
  // if (session) {
  //   const u = await prisma?.user.findFirst({
  //     where: { email: session?.user.email },
  //   });

  //   const { quest, trueorfalse, char } = req.body;

  //   const listId = req.query.id;
  //   if (req.method === "PUT") {
  //     if (trueorfalse) {
  //       await prisma.questsOnUser.create({
  //         data: {
  //           userId: u!.id,
  //           questName: quest.value,
  //         },
  //       });
  //     } else {
  //       await prisma.questsOnUser.deleteMany({
  //         where: { questName: quest.value, userId: u!.id },
  //       });
  //     }

  //     // res.json(stuff);
  //     res.status(201);
  //   } else {
  //     throw new Error(
  //       `The HTTP ${req.method} method is not supported at this route.`
  //     );
  //   }
  // } else {
  //   res.status(401);
  // }
  // res.end();
}
