import { NextPage } from "next";
import List, { ListProps } from "../components/list/List";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prisma";
import Listmodal from "../components/list/Listmodal";
import { Button, Select, Space } from "antd";
import Layout from "../components/layout";
import QuestCategory from "../components/quests/QuestCategory";
import { signIn, signOut } from "next-auth/react";
import moment from "moment";
import { useEffect, useState } from "react";
import Link from "next/link";
import YourDailiesHeader from "../components/YourDailiesHeader";
import { getData } from "./api/user";
import Router, { useRouter } from "next/router";
export type User = {
  // id: string;
  name: string;
  createdAt: string;
  checkedTasks?: string;
  characters?: Character[];
  email: string;
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

export type Character = {
  value: string;
  name: string;
  owner: User;
  questsOnCharacter?: QuestsOnCharacter[];
};

export type QuestsOnCharacter = {
  character: User;
  quest: Quest;
  characterId: string;
  questName: string;
};

const YourDailies: NextPage<Props> = ({ user, lists, quests }) => {
  const { data: session, status } = useSession();
  const [currentCharacter, selectCurrentCharacter] = useState(
    user.characters![0]
  );

  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  //Display the UTC reset time in the users own time zone
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    let utcTimeDaily = "2023-03-07 11:00:00";
    let localDailyReset = moment.utc(utcTimeDaily).local().format("HH:mm:ss");
    setTime(localDailyReset);
  }, []);

  //Dummy listprops to display all quests
  const defaultList: ListProps = {
    tasks: undefined,
    id: "Default",
    title: "Default List",
    owner: null,
    content: null,
    userId: "",
  };
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  //Categories for the possible quests. Hardcoded for now...
  let categories = [
    "Daily Tasks",
    "Undaunted Pledges",
    "Crafting Writs",
    "Craglorn Quests",
    "Trials",
    "Arenas",
    "PvP Quests",
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
    "Northern Elsweyr Defense Force",
  ];

  const [categoriesToDisplay, setCategoriesToDisplay] = useState(categories);
  const [questsToDisplay, setQuestsToDisplay] = useState(quests);

  const characterOptions = user.characters?.map((character) => ({
    value: character.value,
    label: character.name,
  }));
  //Adding the users lists to the list selector dropdown
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

  //Filtering the quests to display in a custom list. Ignore my poor variable names :)
  const handleChange = (value: string) => {
    refreshData();
    if (value === "Default List") {
      setQuestsToDisplay(quests);
      setCategoriesToDisplay(categories);
    } else {
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

  const handleChangeCharacter = (value: string) => {
    const selectedChar = user.characters!.filter(function (el, index) {
      if (el.value === value) {
        setCurrentCharacterIndex(index);
      }
      return el.value === value;
    });

    selectCurrentCharacter(selectedChar[0]);
  };
  if (!session) {
    return (
      <Layout>
        <YourDailiesHeader></YourDailiesHeader>
        {status === "loading" && <div>loading</div>}
        {status === "unauthenticated" && (
          <div className="content-center text-center">
            <div className="text-offwhite-50 w-screen text-center pb-5 pt-5">
              Please sign in to view your daily checklist
            </div>
            <Button
              type="primary"
              onClick={(e) => {
                signIn();
              }}
            >
              Sign In
            </Button>
          </div>
        )}
      </Layout>
    );
  }
  if (session) {
    if (user.characters?.length === 0) {
      return (
        <Layout>
          <YourDailiesHeader></YourDailiesHeader>
          <div className="content-center text-center">
            <div className="text-offwhite-50 w-screen text-center pb-5 pt-5">
              Please create a character on your profile!
            </div>
            <Link href={"/profile"}>
              <Button type="primary">Create a Character</Button>
            </Link>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <YourDailiesHeader></YourDailiesHeader>
        <div className={`pb-4 pt-2 pl-4 pr-4  relative `}>
          <div className="flex flex-col lg:flex-row md:flex-row  justify-center">
            <div className="text-slate-300 pb-2 text-center ">
              {`Daily quests reset at ${time} each day`}
            </div>
            <div className="text-slate-300 pl-0  lg:pl-5 md:pl-5 text-center pb-24 md:pb-0 ">
              {`Weekly quests reset at ${time} on monday`}
            </div>
          </div>

          <div className="flex  sm:space-x-0 lg:space-x-5 md:space-x-3 flex-col  md:flex-row lg:flex-row justify-between relative">
            <div className="w-full grid grid-cols-1   lg:grid-cols-3 md:grid-cols-2 gap-3   auto-cols-1   md:max-h-1 ">
              {/* Displaying Quests */}
              {categoriesToDisplay.map((category) => (
                <div key={category} className=" flex flex-col">
                  <QuestCategory
                    quests={questsToDisplay?.filter(function (el) {
                      return el.category === category;
                    })}
                    name={category}
                    user={user}
                    character={currentCharacter}
                    currindex={currentCharacterIndex}
                  ></QuestCategory>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-3 lg:w-1/3 md:w-1/3 sm:w-full lg:mt-0 md:mt-0 mt-4  whitespace-nowrap overflow-hidden ">
              <Space
                direction="vertical"
                key="test2"
                wrap
                style={{ width: "100%" }}
                className="absolute -top-20 md:relative md:top-0   "
              >
                <Select
                  className=""
                  defaultValue="Default List"
                  style={{ width: "100%" }}
                  onSelect={handleChange}
                  options={listOptions}
                />
              </Space>
              <Space
                direction="vertical"
                key="test233"
                wrap
                style={{ width: "100%" }}
                className="absolute -top-14 md:relative md:top-0   "
              >
                <Select
                  className=""
                  defaultValue={user.characters![0].name}
                  style={{ width: "100%" }}
                  onSelect={handleChangeCharacter}
                  options={characterOptions}
                />
              </Space>
              <Listmodal
                quests={quests}
                user={user}
                categories={categories}
              ></Listmodal>
              {lists?.map((list: any) => (
                <div
                  className="bg-slate-800 justify-between   flex-row object-contain rounded-lg py-2 pl-2 pr-2
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
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const userData = await getData(session);
  return userData;
}

export default YourDailies;
//JSON.parse(JSON.stringify(u))
