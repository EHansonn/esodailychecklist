import React from "react";
import { Quest, User } from "../../pages/yourdailies";
import Router from "next/router";
import { Button } from "antd";
import ListQuestAndRow from "./ListQuestsandmodal";
import { CloseOutlined } from "@ant-design/icons";
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

const List: React.FC<{ list: ListProps; user: User }> = ({ list, user }) => {
  return (
    <div className={`flex flex-col object-contain text-offwhite-50  `}>
      <div className="flex justify-between">
        <h3 className="mt-0  pt-0 mb-0 inline-block align-baseline">{list.title} </h3>
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
        <CloseOutlined className="mt-1 hover:bg-slate-600 cursor-pointer h-[16px] w-[16px]" onClick={async () => {
            await fetch(`/api/list/${list.id}`, {
              method: "DELETE",
            });
            Router.push("/yourdailies");
          }} style={{color: "white"}}></CloseOutlined>
      </div>

      <h4 className="mt-0 mb-2">{list.content}</h4>
      <h4 className="mt-0 mb-0">Selected Quests:</h4>
      <div className="flex flex-col ">
        {list?.tasks!.map((quest: Quest) => {
          return (
            <ListQuestAndRow key={quest.value} quest={quest}></ListQuestAndRow>
          );
        })}
      </div>
    </div>
  );
};

export default List;
