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
import { MutableRefObject, useRef } from "react";
import Header from "../header";
import Layout from "../layout";
import styles from "./index.module.css";

const AboutSection: React.FC<{
  innerRef: MutableRefObject<null | HTMLDivElement>;
}> = ({ innerRef }) => {
  return (
    <div ref={innerRef} className=" pt-20 pb-20">
      <div className="relative  m-auto  pt-1 pb-4 px-3 rounded-lg backdrop-blur-md  bg-slate-800 brightness-90 text-offwhite-50 w-1/2 text-center">
        <h1 className="mt-0 mb-2 pb-0 pt-2">About Us</h1>
        <div className="flex flex-col sm:flex-row ">
          <p className="text-xl text-center text-white  max-w-6xl m-auto">
            ESO Daily Checklist is a small ToDo app created by a former ESO
            player who understands how hard keeping track of your dailies can
            be. While in-game addons can provide similar functionality, the
            online, cross-platoform nature of a web app allows you to more
            easily manage your dailies across multiple devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
