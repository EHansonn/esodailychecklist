import React from "react";
import { Quest, User } from "../../pages/yourdailies";
import Router from "next/router";
import { Button} from "antd";
import ListQuestAndRow from "./ListQuestsandmodal";
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
    <div className={`flex flex-col object-contain text-offwhite-50 `}>
      <div className="flex flex-row justify-between flex-1">
        <h3 className="mt-0 mb-0">{list.title} </h3>
        <Button
          danger
          onClick={async () => {
            await fetch(`/api/list/${list.id}`, {
              method: "DELETE",
            });
            Router.push("/yourdailies");
          }}
        >
          Delete
        </Button>
      </div>

      <h4 className="mt-0 mb-2">{list.content}</h4>
      <h4 className="mt-0 mb-0">Selected Quests:</h4>
      <div className="flex flex-col ">
        {list?.tasks!.map((quest: Quest) => {
          return (
            <ListQuestAndRow
              key={quest.value}
              quest={quest}
              user={user}
            ></ListQuestAndRow>
          );
        })}
      </div>
    </div>
  );
};

export default List;
