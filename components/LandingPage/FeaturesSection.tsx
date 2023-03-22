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
  import Header from "../header";
  import Layout from "../layout";
  import styles from "./index.module.css";

const FeaturesSection = () => {
    return <div className="relative  m-auto  pt-3 pb-4 px-3 rounded-lg backdrop-blur-md  bg-slate-800 brightness-90 text-offwhite-50 w-1/2 text-center">
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
}

export default FeaturesSection