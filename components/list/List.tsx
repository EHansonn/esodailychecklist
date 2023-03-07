import React from "react";
import Router from "next/router";
import Link from "next/link";
import { Button, Space } from "antd";
export type ListProps = {
  tasks: any;
  id: string;
  title: string;
  owner: {
    name: string;
    email: string;
  } | null;
  content: string;
  ownerId: string;
};

const List: React.FC<{ list: ListProps }> = ({ list }) => {
  // <Link href={`/list/${list.id}`}
  // console.log(123123);
  //console.log(list?.tasks[0].quest.value);
  const userName = list.owner ? list.owner.name : "Unknown owner";
  //console.log(list);
  const userEmail = list.owner ? list.owner.email : "unknown";
  return (
    <div className="flex flex-col object-contain text-black  ">
      <h3>Title: {list.title}</h3>
      <small>owner: {userName}</small>
      <small>Email: {userEmail}</small>
      <small>Description: {list.content}</small>
      <div className="flex flex-col">
        {list?.tasks.map((e: any) => {
          return <h3 key={e.quest.value}>quests: {e.quest.value}</h3>;
        })}
      </div>
    </div>
  );
};

export default List;
