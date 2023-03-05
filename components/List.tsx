import React from "react";
import Router from "next/router";
import Link from "next/link";
import { Button, Space } from "antd";
export type ListProps = {
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
  // <Link href={`/list/${list.id}`}>
  const userName = list.owner ? list.owner.name : "Unknown owner";
  //console.log(list);
  const userEmail = list.owner ? list.owner.email : "unknown";
  return (
    <div className="flex flex-col object-contain text-black  ">
      <>
        <h2>title: {list.title}</h2>
        <small>owner: {userName}</small>
        <small>owner: {userEmail}</small>
        <h2>content: {list.content}</h2>
      </>
    </div>
  );
};

export default List;
