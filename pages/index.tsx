import { GithubOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import styles from "./index.module.css";
export default function IndexPage() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-slate-800">
      <Head>
        <title>ESO Daily Tracker</title>
        <meta
          name="ESO Daily Tracker (ESO ToDo)"
          content="Keep track of over a hundred daily tasks from The Elder Scrolls Online. The ESO Daily tracker is a fast and easy tool to manage all of the possible daily tasks in the game. Start by creating a character from your profile. Next, visit your dailies. You can create a custom list to display exactly which dailies you want to focus on."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`${styles.home}   h-screen `}>
        <div className={`w-screen h-screen ${styles.blur}`}>
          <Header></Header>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  pt-3 pb-4 px-3 rounded-lg backdrop-blur-md  bg-white/50">
            <div className="text-6xl text-white text-center">
              ESO Daily Tracker
            </div>
            <div className="text-2xl text-center text-white pt-4">
              Keep track of over 100 daily quests
            </div>
            {status === "unauthenticated" && (
              <div className="content-center text-center">
                <div className="text-white text-center pb-2 pt-2"></div>
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
            {status === "authenticated" && (
              <div className="content-center text-center text-white pt-2 flex flex-col">
                <Link
                  className="text-white text-center  pt-2"
                  href="/yourdailies"
                >
                  <Button type="primary">Your Daily Checklist</Button>
                </Link>
              </div>
            )}
            <div className="justify-center flex pt-2 l">
              <Button
                size="large"
                type="text"
                href={"https://github.com/EHansonn/esodailytracker"}
              >
                <GithubOutlined className="teamSocialIcon text-2x" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 inset-x-0 items-center justify-center text-center rounded-lg backdrop-blur-xl bg-white/50 "></div>
        </div>
      </div>
    </div>
  );
}
