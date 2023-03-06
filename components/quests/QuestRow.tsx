import React from "react";
import Router from "next/router";
import Link from "next/link";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Quest, User } from "../../pages/yourdailies";
export type questProps = {
  quest: Quest;
};

const QuestRow: React.FC<{ quest: Quest; user?: User }> = ({ quest, user }) => {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked ${quest?.value} = ${e.target.checked}`);
    console.log(user?.id);
  };

  const checkedByDefault = user?.checkedTasks?.includes(`{${quest?.value}}`);
  return (
    <div className="flex flex-row my-2 pl-2 ">
      <>
        <Checkbox
          defaultChecked={checkedByDefault}
          onChange={async (e: CheckboxChangeEvent) => {
            //console.log("clicked");
            //console.log(e);
            //console.log(user?.checkedTasks);
            let returnstuff = user?.checkedTasks;
            if (e.target.checked === false) {
              if (user?.checkedTasks?.includes(`{${quest?.value}}`)) {
                returnstuff = returnstuff?.replace(`{${quest?.value}}`, ``);
              }
            } else {
              if (user?.checkedTasks?.includes(`{${quest?.value}}`)) {
              } else {
                returnstuff = returnstuff?.concat(`{${quest?.value}}`);
              }
            }

            await fetch(`/api/user/${user?.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: user?.id,
                checkedTasks: returnstuff,
              }),
            });
            Router.push("/yourdailies");
          }}
        ></Checkbox>
        <h3 className="m-0">{quest?.value}</h3>
      </>
    </div>
  );
};

export default QuestRow;
