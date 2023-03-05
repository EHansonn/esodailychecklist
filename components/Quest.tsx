import React from "react";
import Router from "next/router";
import Link from "next/link";
import { Button, Space } from "antd";
import { Quest } from "../pages/yourdailies";
export type questProps = {
  quest: Quest;
};

const QuestRow: React.FC<{ quest: Quest }> = ({ quest }) => {
  return (
    <div className="">
      <>
        <h3>Title: {quest.value}</h3>
      </>
    </div>
  );
};

export default QuestRow;
