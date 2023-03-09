import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { Checkbox, Drawer } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Quest, User } from "../../pages/yourdailies";

import QuestRow from "../quests/QuestRow";
import styles from "../../pages/index.module.css";
const ListQuestAndRow: React.FC<{ quest: Quest; user?: User }> = ({
  quest,
  user,
}) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  let checkedByDefault;

  user?.questsOnUser?.map((e) => {
    if (e.questName === quest?.value) {
      checkedByDefault = true;
    }
  });

  
  return (
    <>
      <div
        key={`${quest.value} 123`}
        className={`flex flex-row my-1 pl-0 justify-between cursor-pointer  hover:bg-slate-200 ${styles.font} `}
      >
        <div className="flex justify-start"></div>

        <div
          className="flex-1 flex-row flex justify-between"
          onClick={showDrawer}
        >
          <h4 className="pl-2 m-0 ">
            {quest.optionalTitle ? quest.optionalTitle : quest?.value}
          </h4>
          <div className="pl-2 m-0 pr-5 ">
            <div>{quest.repeatable}</div>
          </div>
        </div>
      </div>
      <Drawer
        title={quest.optionalTitle ? quest.optionalTitle : quest?.value}
        placement="left"
        onClose={onClose}
        open={open}
      >
        {quest.optionalTitle && (
          <div className="pb-2">Quest Name: {quest?.value}</div>
        )}
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

export default ListQuestAndRow;
