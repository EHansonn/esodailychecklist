import React from "react";
import Router from "next/router";
import Link from "next/link";
import { Button, Space } from "antd";
import dynamic from "next/dynamic";
export type ListProps = {
  tasks: QuestProps[] | undefined;
  id: string;
  title: string;
  owner: {
    name: string;
    email: string;
  } | null;
  content: string | null;
  userId: string;
};

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

const List: React.FC<{ list: ListProps }> = ({ list }) => {
  // console.log(list);
  // <Link href={`/list/${list.id}`}
  // console.log(123123);
  //console.log(list?.tasks[0].quest.value);
  const userName = list.owner ? list.owner.name : "Unknown owner";
  //console.log(list);
  const userEmail = list.owner ? list.owner.email : "unknown";
  return (
    <div className="flex flex-col object-contain text-black  ">
      <small>Title: {list.title}</small>
      <small>owner: {userName}</small>
      <small>Email: {userEmail}</small>
      <small>Description: {list.content}</small>
      <div className="flex flex-col">
        {list?.tasks!.map((e: any) => {
          return <div key={e.value}>quests: {e.value}</div>;
        })}
      </div>
    </div>
  );
};

export default List;
