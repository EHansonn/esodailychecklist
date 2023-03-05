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
import QuestRow from "../components/Quest";
export type User = {
  id: string;
  name: string;
  createdAt: string;
};

export type Quest = {
  value: string;
  category: string;
  description: string;
  repeatable: string;
  location: string;
  questGiver: string;
  uespLink: string;
  reward: string;
};

interface Props {
  session: Session;
  user?: User;
  lists?: ListProps[];
  error?: string;
  quests?: Quest[];
}

const YourDailies: NextPage<Props> = ({ user, lists, quests }) => {
  //console.log(lists);
  //console.log(quests);
  let undauntedPleges = quests?.filter(function (el) {
    return el.category === "Undaunted Pledges";
  });
  //console.log(undauntedPleges);

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
        <div className="flex space-x-5 flex-row">
          <div className="w-2/3 grid grid-cols-3 gap-3 bg-slate-200">
            <div className="bg-slate-300 flex flex-col h-full">
              <h4 className="py-0 my-0 border-b-2 border-solid border-r-0 border-l-0 border-t-0 relative">
                Undaunted Pledges
                <small className="absolute right-0 ">00:00</small>
              </h4>
              <small>
                {undauntedPleges?.map((quest: any, index) => (
                  <QuestRow key={index} quest={quest}></QuestRow>
                ))}
              </small>
            </div>
            <div className="bg-slate-300">2</div>
            <div className="bg-slate-300">3</div>
            <div className="bg-slate-300">4</div>
            <div className="bg-slate-300">5</div>
            <div className="bg-slate-300">6</div>
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
            select: { value: true },
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
