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
import { useRef } from "react";
import Header from "../header";
import Layout from "../layout";
import styles from "./index.module.css";

const LogoSection: React.FC<{scrollToFunction: Function}> = ({scrollToFunction}) => {
    const { data: session, status } = useSession();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


    return <div className="  pt-3 pb-4 px-3 rounded-lg backdrop-blur-md mb-20 mt-20 bg-slate-800 backdrop-brightness-90">
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
        <div className="content-center text-center text-white pt-2 flex flex-row justify-center space-x-4 ">
        <div
          className="text-white text-center pt-2"
        >
          <Button className="w-40" type="primary" onClick={(e) => {
            signIn();
          }}>
            Sign In
          </Button>
        </div>
        <div
          className="text-white text-center   pt-2"
        >
          <Button onClick={()=> {
            scrollToFunction()
          }}  className="w-40" type="default">
            Learn more
          </Button>
        </div>
      </div>
     
    )}
    {status === "loading" && (
      // <Spin
      //   className="content-center text-center  pt-2 flex flex-row justify-center space-x-4"
      //   indicator={antIcon}
      // />
      <div className="content-center text-center text-white pt-2 flex flex-row justify-center space-x-4 ">
      <div
        className="text-white text-center pt-2"
      >
        <Button className="w-40" type="primary">
          
        </Button>
      </div>
      <div
        className="text-white text-center   pt-2"
      >
        <Button className="w-40" type="default">
          
        </Button>
      </div>
    </div>
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
}

export  default LogoSection