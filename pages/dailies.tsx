import { GetServerSideProps, NextPage } from "next";
import List, { ListProps } from "../components/list/List";
import { getServerSession, Session } from "next-auth";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prisma";
import Listmodal from "../components/list/Listmodal";
import { Button } from "antd";
import Router from "next/router";
import Layout from "../components/layout";
export type User = {
  id: string;
  name: string;
  createdAt: string;
};

export type Quest = {
  value: string;
};

interface Props {
  session: Session;
  user?: User;
  lists?: ListProps[];
  error?: string;
  quests?: Quest[];
}

const Dailies: NextPage<Props> = ({ user, lists, quests }) => {
  //console.log(lists);
  //console.log(quests);

  const { data: session, status } = useSession();
  if (!session) {
    return (
      <Layout>
        <div>access denied/loading</div>{" "}
      </Layout>
    );
  }
  if (session) {
    return (
      <Layout>
        <div className="flex flex-col space-y-3">
          dailies - mostly for testing api and db stuff rn
          <Listmodal quests={quests} user={user}></Listmodal>
          {lists?.map((list: any) => (
            <div
              className="bg-slate-300 object-contain rounded-lg py-2 pl-2"
              key={list.id}
            >
              <Button
                danger
                onClick={async () => {
                  //console.log("clicked");
                  await fetch(`/api/list/${list.id}`, {
                    method: "DELETE",
                  });
                  Router.push("/dailies");
                }}
              >
                delete
              </Button>
              <List list={list}></List>
            </div>
          ))}
        </div>
        <script> </script>
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

export default Dailies;
//JSON.parse(JSON.stringify(u))
