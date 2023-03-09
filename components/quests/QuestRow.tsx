import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { Checkbox, Drawer } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Quest, User } from "../../pages/yourdailies";
export type questProps = {
  quest: Quest;
};

const QuestRow: React.FC<{ quest: Quest; user?: User }> = ({ quest, user }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: CheckboxChangeEvent) => {};
  const router = useRouter();

  let checkedByDefault;
  //let checkedByDefault = false;

  user?.questsOnUser?.map((e) => {
    if (e.questName === quest?.value) {
      checkedByDefault = true;
    }
  });

  return (
    <>
      <div className="flex flex-row my-2 pl-2 justify-between hover:bg-slate-200 cursor-pointer">
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
          ></Checkbox>
        </div>

        <div
          className="flex-1 flex-row flex justify-between"
          onClick={showDrawer}
        >
          <h3 className="pl-2 m-0 ">
            {quest.optionalTitle ? quest.optionalTitle : quest?.value}
          </h3>
          <div className="pl-2 m-0 pr-5 ">
            <div>{quest.repeatable}</div>
          </div>
        </div>
      </div>
      <Drawer
        title={quest.optionalTitle ? quest.optionalTitle : quest?.value}
        placement="right"
        onClose={onClose}
        open={open}
      >
        {quest.optionalTitle && <div>Quest Name: {quest?.value}</div>}
        <div className="pb-2">Category: {quest?.category}</div>
        {quest?.description && <div className="pb-2">{quest?.description}</div>}
        <div className="pb-2">Repeatable: {quest?.repeatable}</div>
        {quest?.location && (
          <div className="pb-2">Location: {quest?.location}</div>
        )}
        {quest?.questGiver && (
          <div className="pb-2">Quest Giver: {quest?.questGiver}</div>
        )}
        {quest?.reward && <div className="pb-2">Reward: {quest?.reward}</div>}
        {quest?.uespLink && (
          <Link href={`${quest?.uespLink}`}>{quest?.uespLink}</Link>
        )}
      </Drawer>
    </>
  );
};

export default QuestRow;
