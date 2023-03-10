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
import { Quest, User } from "./yourdailies";
import CharacterRow from "../components/character/CharacterRow";
import CharacterModel from "../components/character/CharacterModel";
import Link from "next/link";
interface Props {
  user: User;
  lists?: ListProps[];
  error?: string;
  quests?: Quest[];
}

const YourDailies: NextPage<Props> = ({ user, lists, quests }) => {
  const { data: session, status } = useSession();
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
        <div className={`pb-4 pt-2 pl-4 pr-4  relative flex-col `}>
          <div className="flex   relative  rounded-md justify-center">
            <div className="bg-slate-300 justify-center w-3/6 text-center text-black flex flex-row justify-around">
              <div className="flex flex-col">
                {" "}
                Your Characters
                {user.characters?.map((character) => (
                  <CharacterRow
                    key={character.value}
                    user={user}
                    character={character}
                  ></CharacterRow>
                ))}
              </div>
              <div>
                <CharacterModel user={user}></CharacterModel>
              </div>
            </div>
          </div>
          <Link
            className="text-center justify-center flex pt-5"
            href={"/yourdailies"}
          >
            <Button type="primary">View your daily checklist</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  return <div>access denied</div>;
};

export async function getServerSideProps<Props>(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
        })),
        user: {
          characters: c.map((e) => ({
            value: e.value,
            name: e.name,
            questsOnCharacter: JSON.parse(JSON.stringify(e.QuestsOnCharacter)),
          })),
          //id: u.id,
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
  return {
    props: { error: true },
  };
}

export default YourDailies;
//JSON.parse(JSON.stringify(u))
