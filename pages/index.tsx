import {
  BulbOutlined,
  GithubOutlined,
  LoadingOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Spin } from "antd";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";
import Layout from "../components/layout";
import styles from "./index.module.css";

export default function IndexPage() {
  const { data: session, status } = useSession();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Layout>
      <Head>
        <title>ESO Daily Checklist</title>
        <meta
          name="description"
          content="Keep track of the 100+ repeatable quests in the Elder Scrolls Online. Simply login with your google account, create one or more characters, and visit your daily checklist. There you can see every single possible repeatable task and quest in the game. You can check off the ones you've done. Come back tomorrow and you'll find that all your dailies have been reset, so you can get started right away on your tasks!"
        />
        <link rel="icon" href="/favicon.ico"></link>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`pb-4 pt-2 pl-4 pr-4  relative min-h-screen `}>
        <div className=" ">
          <div className="flex flex-col ">
            <div className="  pt-3 pb-4 px-3 rounded-lg backdrop-blur-md mb-20 mt-20 bg-slate-800 backdrop-brightness-90">
              <div className="text-6xl text-white text-center">
                <Image
                  src="/logo3.png"
                  layout="intrinsic"
                  height={200}
                  width={800}
                  alt="logo"
                ></Image>
              </div>
              <p className="text-2xl text-center text-white pt-4 max-w-6xl m-auto">
                A simple and easy way for you to manage and keep track of the
                100+ repeatable quests in the game. Simply login with your
                google account, create one or more characters, and visit your
                daily checklist. There you can see every single possible
                repeatable task and quest in the game. You can check off the
                ones you've done. Come back tomorrow and you'll find that all
                your dailies have been reset, so you can get started right away
                on your tasks!
              </p>
              {status === "unauthenticated" && (
                <div className="content-center text-center">
                  <div className="text-white text-center pb-2 pt-2"></div>
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
              {status === "loading" && (
                <Spin
                  className="content-center text-center  pt-2 flex flex-row justify-center space-x-4"
                  indicator={antIcon}
                />
              )}

              {status === "authenticated" && (
                <div className="content-center text-center text-white pt-2 flex flex-row justify-center space-x-4 ">
                  <Link
                    className="text-white text-center pt-2"
                    href="/yourdailies"
                  >
                    <Button className="w-40" type="primary">
                      Your Daily Checklist
                    </Button>
                  </Link>
                  <Link
                    className="text-white text-center   pt-2"
                    href="/profile"
                  >
                    <Button className="w-40" type="default">
                      Visit Your Profile
                    </Button>
                  </Link>
                </div>
              )}
              <div className="justify-center flex pt-2 l"></div>
            </div>
            <div className="relative  m-auto  pt-3 pb-4 px-3 rounded-lg backdrop-blur-md  bg-slate-800 brightness-90 text-offwhite-50 w-1/2 text-center">
              <h1 className="mt-0 mb-2 ">Features</h1>
              <div className="flex flex-col sm:flex-row ">
                <h3 className="mt-0 mb-1 ">
                  <TeamOutlined style={{ fontSize: "20px" }} />
                  Keep track of your own custom characters with their own check
                  lists.
                </h3>
                <h3 className="mt-0 mb-1">
                  <UnorderedListOutlined style={{ fontSize: "20px" }} />
                  {
                    " Create a custom list from the preset tasks to better focus on what you care about."
                  }
                </h3>
                <h3 className="mt-0 mb-1">
                  <BulbOutlined style={{ fontSize: "20px" }} />
                  Find information and links to the UESP for every single quest
                </h3>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 inset-x-0 items-center justify-center text-center rounded-lg backdrop-blur-xl bg-white/50 "></div>{" "}
          <div className="flex flex-col space-y-3 lg:w-1/3 md:w-1/3 sm:w-full lg:mt-0 md:mt-0 mt-4  whitespace-nowrap overflow-hidden "></div>
        </div>
      </div>
    </Layout>
  );
}
