import { GetServerSideProps, NextPage } from "next";
import List, { ListProps } from "../components/List";
import { getServerSession, Session } from "next-auth";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prisma";
import Listmodal from "../components/Listmodal";
import { Button } from "antd";
import Router from "next/router";
import Layout from "../components/layout";
import QuestRow from "../components/quests/QuestRow";
import QuestCategory from "../components/quests/QuestCategory";
export type User = {
  id: string;
  name: string;
  createdAt: string;
};

export type Quest = {
  value: string;
  category?: string;
  description?: string;
  repeatable?: string;
  location?: string;
  questGiver?: string;
  uespLink?: string;
  reward?: string;
};

interface Props {
  session: Session;
  user?: User;
  lists?: ListProps[];
  error?: string;
  quests?: Quest[];
}

const YourDailies: NextPage<Props> = ({ user, lists, quests }) => {
  console.log("test");
  console.log(quests);

  const dayPassed = () => {
    console.log("a day has passed... will work on this later");
  };

  const { data: session, status } = useSession();
  if (!session) {
    return (
      <Layout>
        <div>access denied/loading</div>
      </Layout>
    );
  }
  if (session) {
    return (
      <Layout>
        <Button type="primary" onClick={dayPassed}>
          Simulate day passing
        </Button>
        <div className="flex space-x-5 flex-row">
          <div className="w-2/3 grid grid-cols-3 gap-3 flex bg-slate-200  grid-rows-[minmax(0,_2fr)]">
            <div className="bg-slate-300 flex flex-col">
              <QuestCategory
                quests={quests?.filter(function (el) {
                  return el.category === "Undaunted Pledges";
                })}
                name={"Undaunted Pledges"}
              ></QuestCategory>
            </div>

            <div className="bg-slate-300 flex flex-col">
              <QuestCategory
                quests={undefined}
                name={"Quild Daily Quests"}
              ></QuestCategory>
              <QuestCategory
                quests={quests?.filter(function (el) {
                  return el.category === "Fighters Guild Daily";
                })}
                name={"Fighters Guild Daily"}
              ></QuestCategory>
              <QuestCategory
                quests={quests?.filter(function (el) {
                  return el.category === "Mages Guild Daily";
                })}
                name={"Mages Guild Daily"}
              ></QuestCategory>
              <QuestCategory
                quests={quests?.filter(function (el) {
                  return el.category === "Undaunted Daily";
                })}
                name={"Undaunted Daily"}
              ></QuestCategory>
            </div>
            <div className="bg-slate-300 flex flex-col">
              <QuestCategory
                quests={undefined}
                name={"Crafting Writs"}
              ></QuestCategory>
              <QuestCategory
                quests={quests?.filter(function (el) {
                  return el.category === "Consumables Crafting Writs";
                })}
                name={"Consumables Crafting Writs"}
              ></QuestCategory>
              <QuestCategory
                quests={quests?.filter(function (el) {
                  return el.category === "Equipment Crafting Writs";
                })}
                name={"Equipment Crafting Writs"}
              ></QuestCategory>
            </div>
            <div className="bg-slate-300 flex flex-col">
              <QuestCategory
                quests={quests?.filter(function (el) {
                  return el.category === "Trials";
                })}
                name={"Trials"}
              ></QuestCategory>
            </div>
            <div className="bg-slate-300 flex flex-col">
              <QuestCategory
                quests={quests?.filter(function (el) {
                  return el.category === "Arenas";
                })}
                name={"Arenas"}
              ></QuestCategory>
            </div>
            <div className="bg-slate-300 flex flex-col">
              <QuestCategory
                quests={quests?.filter(function (el) {
                  return el.category === "Craglorn Quests";
                })}
                name={"Craglorn Quests"}
              ></QuestCategory>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            Your custom lists
            <Listmodal quests={quests} user={user}></Listmodal>
            {lists?.map((list: any) => (
              <div
                className="bg-slate-300  flex flex-col object-contain rounded-lg py-2 pl-2 pr-2"
                key={list.id}
              >
                <Button
                  danger
                  onClick={async () => {
                    //console.log("clicked");
                    await fetch(`/api/list/${list.id}`, {
                      method: "DELETE",
                    });
                    Router.push("/yourdailies");
                  }}
                >
                  delete
                </Button>
                <List list={list}></List>
              </div>
            ))}
          </div>
          <script> </script>
        </div>
      </Layout>
    );
  }
  return <div>access denied</div>;
};

export async function getServerSideProps<Props>(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const userId = session?.user.id;
  const u = await prisma?.user.findFirst({
    where: { id: userId },
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
            },
          },
        },
      },
    },
  });
  const availableQuests = await prisma?.quest.findMany({});
  console.log("tessssss");
  console.log(availableQuests);
  if (u && lists) {
    return {
      props: {
        session: session,
        lists,
        user: {
          id: u.id,
          name: u.name,
          createdAt: u.createdAt.toString(),
        },
        quests: availableQuests,
      },
    };
  }
  return {
    props: { error: true },
  };
}

export default YourDailies;
//JSON.parse(JSON.stringify(u))
/*.map((quest) => ({
          value: quest.value,
          category: quest.category,
        }))*/
