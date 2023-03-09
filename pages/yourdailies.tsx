import { GetServerSideProps, NextPage } from "next";
import List, { ListProps } from "../components/list/List";
import { getServerSession, Session } from "next-auth";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prisma";
import Listmodal from "../components/list/Listmodal";
import { Button, Select, Space } from "antd";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout";
import QuestRow from "../components/quests/QuestRow";
import QuestCategory from "../components/quests/QuestCategory";
import styles from "./index.module.css";
import Head from "next/head";
import { signIn, signOut } from "next-auth/react";
import moment from "moment";
import { useEffect, useState } from "react";

export type User = {
  id: string;
  name: string;
  createdAt: string;
  checkedTasks?: string;
  questsOnUser?: QuestsOnUser[];
};

export type QuestsOnUser = {
  user: User;
  quest: Quest;
  userId: string;
  questName: string;
};

export type Quest = {
  value: string;
  category?: string;
  optionalTitle: string | null;
  description?: string;
  repeatable?: string;
  location?: string;
  questGiver?: string;
  uespLink?: string;
  reward?: string;
};

interface Props {
  user: User;
  lists?: ListProps[];
  error?: string;
  quests?: Quest[];
}

const YourDailies: NextPage<Props> = ({ user, lists, quests }) => {
  const { data: session, status } = useSession();

  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    let utcTimeDaily = "2023-03-07 11:00:00";
    let localDailyReset = moment.utc(utcTimeDaily).local().format("HH:mm:ss");
    setTime(localDailyReset);
  }, []);
  const defaultList: ListProps = {
    tasks: undefined,
    id: "Default",
    title: "Default List",
    owner: null,
    content: null,
    userId: "",
  };
  let categories = [
    "Undaunted Pledges",
    "Crafting Writs",
    "Arenas",
    "Trials",
    "Craglorn Quests",
    "PvP Quests",
    "Northern Elsweyr Defense Force",
    "Guild Daily Quests",
    "Imperial City Quests",
    "Wrothgar Quests",
    "Thieves Guild Quests",
    "Gold Coast Quests",
    "Vvardenfell Quests",
    "Clockwork City Quests",
    "Summerset Quests",
    "Murkmire Quests",
    "Elsweyr Quests",
    "Dragonhold Quests",
    "Western Skyrim Quests",
    "The Reach Quests",
    "Blackwood Quests",
    "Deadlands Quests",
    "High Isle Quests",
    "Galen Quests",
    "Cyrodiil Settlement Quests",
    "Fighters Guild Bounty Quests",
    "Cyrodilic Collections",
  ];
  const [categoriesToDisplay, setCategoriesToDisplay] = useState(categories);
  const [selectedList, setSelectedList] = useState("Default");
  const [questsToDisplay, setQuestsToDisplay] = useState(quests);
  const listOptions = lists?.map((list) => ({
    value: list.title,
    label: list.title,
    key: list.id,
  }));
  listOptions?.unshift({
    value: defaultList.title,
    label: "Default List",
    key: "default",
  });

  const handleChange = (value: string) => {
    if (value === "Default List") {
      setQuestsToDisplay(quests);
      setCategoriesToDisplay(categories);
    } else {
      setSelectedList(value);
      const listfinder = lists!.filter(function (el) {
        return el.title === value;
      });
      const questz = listfinder![0].tasks!.map((e) => {
        return e.value;
      });
      const tester = quests!.filter(function (el) {
        if (questz.includes(el.value)) return el.value;
      });
      setQuestsToDisplay(tester);

      let questCats = listfinder![0].tasks!.map((e) => {
        return e.category;
      });
      let unique = questCats.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      //@ts-ignore
      setCategoriesToDisplay(unique);
    }
  };
  //Categories for the possible quests. Hardcoded for now...

  if (!session) {
    return (
      <Layout>
        {status === "loading" && <div>loading</div>}
        {status === "unauthenticated" && (
          <div className="content-center text-center">
            <div className="text-white w-screen text-center pb-5">
              Please sign in
            </div>
            <Button
              type="primary"
              onClick={(e) => {
                signIn();
              }}
            >
              Sign In With Google
            </Button>
          </div>
        )}
      </Layout>
    );
  }

  if (session) {
    return (
      <Layout>
        <div className={`pb-4 pt-2 pl-4 pr-4   `}>
          <div className="flex flex-col lg:flex-row md:flex-row  justify-center">
            <div className="text-slate-300 pb-2 text-center">
              {`Daily quests reset at ${time} each day`}
            </div>
            <div className="text-slate-300 pb-2 pl-5 text-center">
              {`Weekly quests reset at ${time} on monday`}
            </div>
          </div>

          <div className="flex  sm:space-x-0 lg:space-x-5 md:space-x-3  flex-col sm:flex-col md:flex-row lg:flex-row justify-between">
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 flex   auto-cols-1  w-2/3  ">
              {/* Displaying Quests */}
              {categoriesToDisplay.map((category) => (
                <div key={category} className=" flex flex-col">
                  <QuestCategory
                    quests={questsToDisplay?.filter(function (el) {
                      return el.category === category;
                    })}
                    name={category}
                    user={user}
                  ></QuestCategory>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-3 lg:w-1/3 md:w-1/3 sm:w-full lg:mt-0 md:mt-0 mt-4">
              <Space wrap>
                <Select
                  defaultValue="Default List"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={listOptions}
                />
              </Space>

              <Listmodal quests={quests} user={user}></Listmodal>
              {lists?.map((list: any) => (
                <div
                  className="bg-slate-300 justify-between  flex-row object-contain rounded-lg py-2 pl-2 pr-2
                  "
                  key={list.id}
                >
                  <List user={user} list={list}></List>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  return <div>access denied</div>;
};

export async function getServerSideProps<Props>(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const userId = session?.user.email;
  const u = await prisma?.user.findFirst({
    where: { email: session?.user.email },
    include: {
      QuestsOnUser: true,
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
          userId: list.userId,
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
          id: u.id,
          name: u.name,
          createdAt: u.createdAt.toString(),
          checkedTasks: u.checkedTasks,
          questsOnUser: JSON.parse(JSON.stringify(u.QuestsOnUser)),
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
