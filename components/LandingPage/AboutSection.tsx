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
 
const AboutSection : React.FC<{innerRef:MutableRefObject<null | HTMLDivElement> }>= ({innerRef}) => {

    return <div  ref={innerRef} className=" pt-20"><div className="relative pb-2 mb-[800px]  m-auto  rounded-lg backdrop-blur-md  bg-slate-800 brightness-90 text-offwhite-50 w-full text-center">
    <h1 className="mt-0 mb-2 ">About</h1>
    <div className="flex flex-col sm:flex-row ">
    <p className="text-2xl text-center text-white pt-4 max-w-6xl m-auto">
      About text here
    </p>
    </div>
  </div></div>
}

export default AboutSection