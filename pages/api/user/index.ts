import { getServerSession, Session } from "next-auth";
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";

export async function getData(session: Session) {
  if (!session) {
    return {};
  }
  try {
    const u = await prisma?.user.findUnique({
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
    if (u && lists && session) {
      return {
        props: {
          session: session,
          lists: lists.map((list) => ({
            id: list.id,
            title: list.title,
            content: list.content,
            owner: list.owner,
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
            characters: c.map((e) => ({
              value: e.value,
              name: e.name,
              questsOnCharacter: JSON.parse(
                JSON.stringify(e.QuestsOnCharacter)
              ),
            })),
            name: u.name,
            createdAt: u.createdAt.toString(),
            checkedTasks: u.checkedTasks,
            questsOnUser: JSON.parse(JSON.stringify(u.QuestsOnUser)),
            email: u.email,
          },
          quests: availableQuests,
        },
      };
    }
  } catch {
    return {};
  }
}

//Data is only accessible through get server side props
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    res.end();
    return;
  }
  try {
    const data = await getData(session);
    res.send(data);
    res.status(201);
  } catch (e) {
    res.send({});
    res.status(501);
  }

  res.end();
}
