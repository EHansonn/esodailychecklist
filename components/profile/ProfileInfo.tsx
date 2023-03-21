import { NextPage } from "next";
import { ListProps } from "../list/List";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import prisma from "../../lib/prisma";
import { Alert, Button } from "antd";
import Layout from "../layout";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Quest, User } from "../DailyChecklist/dailieschecklist";
import CharacterRow from "../character/CharacterRow";
import CharacterModel from "../character/CharacterModel";
import Link from "next/link";
import { getData } from "../../pages/api/user";
import { EditOutlined } from "@ant-design/icons";
interface Props {
  user: User;
  lists?: ListProps[];
  error?: string;
  quests?: Quest[];
}

const ProfileInfo: NextPage<Props> = ({ user, }) => {
  const { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [numOfChars, setNumOfChars] = useState(user.characters?.length || 0);

  const helperFunction = (val: number) => {
    setNumOfChars((currVal) => {
      let temp = currVal + val;
      if (temp < 0) {
        temp = 0;
      }
      return temp;
    });
  };

  if (session) {
    return (
      <Layout>
        <Head>
          <title>Your Profile - ESO Daily Checklist</title>
          <meta
            name="description"
            content="Keep track of the 100+ repeatable quests in the Elder Scrolls Online. Simply login with your google account, create one or more characters, and visit your daily checklist. There you can see every single possible repeatable task and quest in the game. You can check off the ones you've done. Come back tomorrow and you'll find that all your dailies have been reset, so you can get started right away on your tasks!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className={`pl-4 pr-4 flex flex-col   min-h-screen`}>
          <div className="flex  justify-center   ">
            <div className=" ml-10  sm:ml-40 mr-10 sm:mr-40 w-screeen text-center pr-3 border-b-2 border-t-0 border-l-0  pb-10 border-r-0 border-solid text-offwhite-50 flex flex-col w-max sm:flex-col justify-center sm:pr-0">
              <div className="flex  justify-center     ">
                <div className=" mt-10    text-offwhite-50 flex flex-col w-max  justify-center  mb-10  ">
                  <div className="border-t-0 border-l-0  border-b-2 border-r-0  border-solid -mr-3 sm:mr-0">
                    Your Profile
                  </div>

                  <div>Name: {user.name}</div>
                  <div>Email: {user.email}</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col ">
                  <div
                    className="border-solid border-b-2 border-t-0 border-l-0 border-r-0 w-full pr-3
                 mr-0 sm:mr-5  md:w-56 lg:w-96 "
                  >
                    Your Characters
                    <EditOutlined
                      // className={classNames(
                      //   item.current
                      //     ? "bg-gray-900 text-white"
                      //     : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      //   "rounded-md px-3 py-2 text-sm font-medium"
                      // )}
                      onClick={() => {
                        setEditMode((editMode) => {
                          return !editMode;
                        });
                      }}
                      className=" ml-2 rounded-sm hover:bg-gray-700 transition ease-in-out delay-75 hover:scale-110 duration-100"
                    />
                  </div>
                  {user.characters?.map((character) => (
                    <CharacterRow
                      helperFunction={helperFunction}
                      editMode={editMode}
                      key={character.value}
                      user={user}
                      character={character}
                    ></CharacterRow>
                  ))}
                </div>
                <div>
                  <CharacterModel
                    helperFunction={helperFunction}
                    user={user}
                  ></CharacterModel>
                </div>
              </div>
            </div>
          </div>
          {numOfChars > 0 && (
            <div className="justify-center flex">
              <Link
                className="text-center flex pt-5 w-max"
                href={"/yourdailies"}
              >
                <Button key="test" type="primary">
                  View your daily checklist
                </Button>
              </Link>
            </div>
          )}
          {numOfChars === 0 && (
            <div className="flex justify-center pt-5 ">
              <Alert
                message="Please add at least one character"
                type="warning"
              />
            </div>
          )}
        </div>
      </Layout>
    );
  }
  return <div>access denied</div>;
};

export default ProfileInfo;
//JSON.parse(JSON.stringify(u))
