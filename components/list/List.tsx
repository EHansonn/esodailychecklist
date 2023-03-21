import React, { useState } from "react";
import { Quest, User } from "../DailyChecklist/dailieschecklist";
import Router from "next/router";
import { Button } from "antd";
import ListQuestAndRow from "./ListQuestsandmodal";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
export type ListProps = {
  tasks: Quest[] | undefined;
  id: string;
  title: string;
  owner: {
    name: string;
    email: string;
  } | null;
  content: string | null;
  userId: string;
};

//Old questprops
export type QuestProps = {
  value: string;
  category: string;
  optionTitle: string | null;
  description: string | null;
  repeatable: string;
  location: string | null;
  questGiver: string | null;
  uespLink: string | null;
  reward: string | null;
};

const List: React.FC<{
  list: ListProps;
  user: User;
  refreshData: Function;
}> = ({ list, user, refreshData }) => {
  const [active, setActive] = useState(false);

  const showDetails = () => {
    setActive((currVal) => {
      return !currVal;
    });
  };

  return (
    <div className={`flex flex-col object-contain text-offwhite-50  `}>
      <div
        className="flex justify-between cursor-pointer hover:bg-slate-600 "
        onClick={showDetails}
      >
        <h3 className="mt-0  pt-0 mb-0 inline-block align-baseline">
          {list.title}{" "}
        </h3>
        {/* <Bu pt-0 tton
          
          onClick={async () => {
            await fetch(`/api/list/${list.id}`, {
              method: "DELETE",
            });
            Router.push("/yourdailies");
          }}
        >
          Delete
        </Button> */}
        <div>
          <DownOutlined
            className={`mt-1 mr-5 hover:bg-slate-600 cursor-pointer h-[16px] w-[16px] ${
              active ? "hidden" : ""
            }`}
          />
          <UpOutlined
            className={`mt-1 mr-5 hover:bg-slate-600 cursor-pointer h-[16px] w-[16px] ${
              active ? "" : "hidden"
            }`}
          />
          <CloseOutlined
            className="mt-1 hover:bg-slate-600 cursor-pointer h-[16px] w-[16px]"
            onClick={async () => {
              await fetch(`/api/list/${list.id}`, {
                method: "DELETE",
              });
              refreshData();
            }}
            style={{ color: "white" }}
          ></CloseOutlined>
        </div>
      </div>
      <div className={`${active ? "" : "hidden"}`}>
        <h4 className="mt-0 mb-2">{list.content}</h4>
        <h4 className="mt-0 mb-0">Selected Quests:</h4>
        <div className="flex flex-col ">
          {list?.tasks!.map((quest: Quest) => {
            return (
              <ListQuestAndRow
                key={quest.value}
                quest={quest}
              ></ListQuestAndRow>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
