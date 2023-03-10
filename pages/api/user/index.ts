// pages/api/post/[id].ts

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export async function getData(session: any) {
  const u = await prisma?.user.findFirst({
    where: { email: session?.user.email },
    include: {
      QuestsOnUser: true,
    },
  });

  const c = await prisma?.character.findMany({
    where: {
      userId: u!.id,
    },
    include: {
      QuestsOnCharacter: true,
    },
  });

  const lists = await prisma.list.findMany({
    where: {
      userId: u?.id,
    },
    include: {
      owner: {
        select: { name: true, email: true },
      },
      tasks: {
        select: {
          quest: {
            select: {
              value: true,
              category: true,
              optionalTitle: true,
              description: true,
              repeatable: true,
              location: true,
              questGiver: true,
              uespLink: true,
              reward: true,
            },
          },
        },
      },
    },
  });

  const availableQuests = await prisma?.quest.findMany({});
  if (u && lists) {
    return {
      props: {
        session: session,
        lists: lists.map((list) => ({
          id: list.id,
          title: list.title,
          content: list.content,
          owner: list.owner,
          //userId: list.userId,
          tasks: list.tasks.map((e) => ({
            value: e.quest.value,
            category: e.quest.category,
            optionalTitle: e.quest.optionalTitle,
            description: e.quest.description,
            repeatable: e.quest.repeatable,
            location: e.quest.location,
            questGiver: e.quest.questGiver,
            uespLink: e.quest.uespLink,
            reward: e.quest.reward,
          })),
        })),
        user: {
          // id: u.id,
          characters: c.map((e) => ({
            value: e.value,
            name: e.name,
            questsOnCharacter: JSON.parse(JSON.stringify(e.QuestsOnCharacter)),
          })),
          name: u.name,
          createdAt: u.createdAt.toString(),
          checkedTasks: u.checkedTasks,
          questsOnUser: JSON.parse(JSON.stringify(u.QuestsOnUser)),
        },
        quests: availableQuests,
      },
    };
  }
}

export default async function handle(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  if (session === null) {
    res.status(401);
    res.end();
  }
  if (session) {
    const jsonData = await getData(session);
    res.status(200).json(jsonData);
  } else {
    res.status(400);
  }
}
