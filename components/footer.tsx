import Link from "next/link";
import styles from "./footer.module.css";
import packageJSON from "../package.json";
import { GithubOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <div className=" bg-slate-800 text-offwhite-50 text-center  flex justify-center">
      <div className="flex-row flex pt-5 pb-5 relative">
        <div className="flex flex-col">
          <small>ESO Daily Checklist</small>
          <small>Made by EHansonn</small>
        </div>
        <div className="align-middle h-full  content-center flex pt-1 pl-2  ">
          <Link
            style={{ textDecoration: "none" }}
            href={"https://github.com/EHansonn/esodailychecklist"}
          >
            <GithubOutlined className="teamSocialIcon text-3xl text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
