import React from "react";
import Router from "next/router";
import Link from "next/link";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Quest } from "../../pages/yourdailies";
export type questProps = {
  quest: Quest;
};

const QuestRow: React.FC<{ quest: Quest }> = ({ quest }) => {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked ${quest?.value} = ${e.target.checked}`);
  };
  return (
    <div className="flex flex-row my-2 ">
      <>
        <Checkbox defaultChecked={false} onChange={onChange}></Checkbox>
        <h3 className="m-0">{quest?.value}</h3>
      </>
    </div>
  );
};

export default QuestRow;
