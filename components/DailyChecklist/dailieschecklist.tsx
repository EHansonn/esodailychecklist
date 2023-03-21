import { NextPage } from "next";
import List, { ListProps } from "../list/List";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import prisma from "../../lib/prisma";
import Listmodal from "../list/Listmodal";
import { Button, Radio, RadioChangeEvent, Select, Space } from "antd";
import Layout from "../layout";
import QuestCategory from "../quests/QuestCategory";
import { signIn, signOut } from "next-auth/react";
import moment from "moment";
import { useEffect, useState } from "react";
import Link from "next/link";
import YourDailiesHeader from "./YourDailiesHeader";
import { getData } from "../../pages/api/user";
import Footer from "../footer";
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

export interface Props {
  user: User;
  lists?: ListProps[];
  error?: string;
  quests?: Quest[];
  refreshData: Function;
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

const YourDailiesChecklist: NextPage<Props> = ({
  user,
  lists,
  quests,
  refreshData,
}) => {
  const { data: session, status } = useSession();
  const [currentCharacter, selectCurrentCharacter] = useState(
    user.characters![0]
  );

  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  //Display the UTC reset time in the users own time zone
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    let utcTimeDaily = "2023-03-07 07:00:00";
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
  //Categories for the possible quests. Hardcoded for now...
  let categories = [
    "Weekly Tasks and Trials",
    "Daily Tasks",
    "Craglorn Quests",
    "PvP Quests",
    "Imperial City Quests",
    "Guild Daily Quests",
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
    "Miscellaneous",
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

  //Setting last selected character on page reload
  const [characterSelectedValue, setCharacterSelectedValue] =
    useState("Character Name");
  useEffect(() => {
    if (user.characters) {
      if (user.characters.length > 0) {
        setCharacterSelectedValue(user.characters![0].name);
      }
    }
  }, [, user, lists]);

  useEffect(() => {
    if (user.characters?.length === 0) {
    } else {
      if (localStorage.getItem("character") === null) {
      } else {
        const localStorageChar = localStorage.getItem("character");
        user.characters?.forEach((character) => {
          if (character.value === localStorageChar) {
            handleChangeCharacter(localStorageChar!);
            setCharacterSelectedValue(localStorageChar!);
          }
        });
      }
    }
  }, [, user, lists]);

  //Setting the current list to the last selected one if it exists on page reload
  const [listSelectedValue, setListSelectedValue] = useState("Default List");
  useEffect(() => {
    if (localStorage.getItem("list") === null) {
    } else {
      const localStorageList = localStorage.getItem("list");
      let exists = false;
      lists?.forEach((list) => {
        if (list.title === localStorageList) {
          handleChange(localStorageList!);
          setListSelectedValue(localStorageList!);
          exists = true;
        }
      });
      if (!exists) {
        handleChange("Default List");
      }
    }
  }, [, user, lists]);

  //Filtering the quests to display in a custom list. Ignore my poor variable names :)
  const handleChange = (value: string) => {
    setListSelectedValue(value);
    localStorage.removeItem("list");
    localStorage.setItem("list", value);
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
  useEffect(() => {
    //console.log(categoriesToDisplay);
  }, [categoriesToDisplay]);

  const handleChangeCharacter = (value: string) => {
    setCharacterSelectedValue(value);
    localStorage.removeItem("character");
    localStorage.setItem("character", value);

    const selectedChar = user.characters!.filter(function (el, index) {
      if (el.value === value) {
        setCurrentCharacterIndex(index);
      }
      return el.value === value;
    });

    selectCurrentCharacter(selectedChar[0]);
  };

  //Filter for daily or weekly quests
  const [filter, setFilter] = useState("All Quests");
  const handleFilterChange = ({ target: { value } }: RadioChangeEvent) => {
    setFilter(value);
  };

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
      <>
        <Layout>
          <YourDailiesHeader></YourDailiesHeader>
          <div className={`pb-4 pt-2 pl-4 pr-4  relative min-h-screen `}>
            <div className="flex flex-col md:flex-row  justify-center space-y-6 sm:space-y-0 ">
              <div className="text-slate-300 pb-2 text-center ">
                {`Daily quests reset at ${time} each day`}
              </div>
              <div className="text-slate-300 pl-0  lg:pl-5 md:pl-5 text-center pb-36 md:pb-0 ">
                {`Weekly quests reset at ${time} on monday`}
              </div>
            </div>

            <div className="flex  sm:space-x-0 lg:space-x-5 md:space-x-3 flex-col  md:flex-row lg:flex-row justify-between relative">
              <div
                className={`w-full grid grid-cols-1  h-full lg:grid-cols-3 md:grid-cols-2 gap-x-3 gap-y-16 sm:gap-y-3  auto-cols-1   `}
              >
                {/* Displaying Quests */}

                {categories.map((category) => (
                  <QuestCategory
                    key={category}
                    quests={quests?.filter(function (el) {
                      return el.category === category;
                    })}
                    name={category}
                    user={user}
                    character={currentCharacter}
                    currindex={currentCharacterIndex}
                    categoriesToDisplay={categoriesToDisplay}
                    questsToDisplay={questsToDisplay!}
                    filter={filter}
                  ></QuestCategory>
                ))}
              </div>

              <div className="flex flex-col space-y-3 lg:w-1/3 md:w-1/3 sm:w-full lg:mt-0 md:mt-0 mt-14  ">
                <div className="w-full flex justify-center absolute -top-32  md:relative md:top-0 ">
                  <Radio.Group
                    options={[
                      { value: "All Quests", label: "All Quests" },
                      { value: "daily", label: "Daily Quests" },
                      { value: "weekly", label: "Weekly Quests" },
                    ]}
                    onChange={handleFilterChange}
                    value={filter}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </div>

                <Space
                  direction="vertical"
                  key="test2"
                  wrap
                  style={{ width: "100%" }}
                  className="absolute -top-24 md:relative md:top-0   "
                >
                  <Select
                    className=""
                    defaultValue={"Default List"}
                    style={{ width: "100%" }}
                    value={listSelectedValue}
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
                    value={characterSelectedValue}
                    style={{ width: "100%" }}
                    onSelect={handleChangeCharacter}
                    options={characterOptions}
                  />
                </Space>
                <Listmodal
                  quests={quests}
                  categories={categories}
                  refreshData={refreshData}
                ></Listmodal>
                {lists?.map((list: any) => (
                  <div
                    className="bg-slate-800 justify-between   flex-row object-contain rounded-lg py-2 pl-2 pr-2
                  "
                    key={list.id}
                  >
                    <List
                      user={user}
                      list={list}
                      refreshData={refreshData}
                    ></List>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
  return <div>access denied</div>;
};

export default YourDailiesChecklist;
