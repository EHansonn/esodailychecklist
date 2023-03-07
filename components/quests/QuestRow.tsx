import React from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Quest, User } from "../../pages/yourdailies";
export type questProps = {
  quest: Quest;
};

const QuestRow: React.FC<{ quest: Quest; user?: User }> = ({ quest, user }) => {
  const onChange = (e: CheckboxChangeEvent) => {};
  const router = useRouter();
  // console.log(quest);
  let checkedByDefault = false;
  user?.questsOnUser?.map((e) => {
    if (e.questName === quest?.value) {
      checkedByDefault = true;
    }
  });

  return (
    <div className="flex flex-row my-2 pl-2 justify-between hover:bg-slate-200">
      <div className="flex justify-start">
        <Checkbox
          defaultChecked={checkedByDefault}
          onChange={async (e: CheckboxChangeEvent) => {
            await fetch(`/api/user/${user?.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: user?.id,

                quest: quest,
                trueorfalse: e.target.checked,
              }),
            });
            // router.push(
            //   {
            //     pathname: router.pathname,
            //   },
            //   undefined,
            //   { scroll: false }
            // );
          }}
        ></Checkbox>{" "}
        <h3 className="pl-2 m-0">{quest?.value}</h3>
      </div>

      <div className="flex flex-row ">
        <div className="pl-2 m-0 pr-5 ">{(quest.repeatable === "daily") && <div>daily</div>}
        {(quest.repeatable === "weekly") && <div>weekly</div>}
        {(quest.repeatable === "immediately") && <div>immediately</div>}</div>
      </div>
    </div>
  );
};

export default QuestRow;
