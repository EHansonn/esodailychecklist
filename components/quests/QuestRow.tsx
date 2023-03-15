import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Checkbox, Drawer } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Character, Quest, User } from "../../pages/yourdailies";
import styles from "../../pages/index.module.css";
import { CloseOutlined } from "@ant-design/icons";
export type questProps = {
  quest: Quest;
};

export type charChecked = {
  boolVal: boolean;
  character: Character;
};

export type allstuff = {
  charChecked: charChecked[];
};

const QuestRow: React.FC<{
  quest: Quest;
  character?: Character;
  currindex?: number;
  characters?: Character[];
  questsToDisplay?: Quest[];
  filter: string;
}> = ({ quest, character, characters, currindex, questsToDisplay, filter }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [active, setActive] = useState(false);
  const [questz, setQuestz] = useState(questsToDisplay);

  useEffect(() => {
    setActive(false);
    setQuestz(questsToDisplay);
  }, [, questsToDisplay, questz]);

  useEffect(() => {
    questz!.forEach((el) => {
      if (el.value === quest.value) {
        setActive(true);
      }
    });

    if (quest.repeatable === filter || filter === "All Quests") {
      //setActive(true);
    } else {
      setActive(false);
    }
  }, [, quest, questsToDisplay, questz, filter]);

  const values = characters?.map((charactere) => {
    const quests = charactere.questsOnCharacter?.filter(function (e) {
      return e.questName === (quest.value || quest.optionalTitle);
    });
    if (quests!.length >= 1) {
      return true;
    } else {
      return false;
    }
  });

  const [charz, setCharz] = useState(values);

  const [checked, setChecked] = useState(charz![currindex!]);

  useEffect(() => {
    setChecked(charz![currindex!]);
  }, [charz, character]);
  return (
    <>
      <div
        className={`flex flex-row my-2 pl-2 justify-between hover:bg-slate-600 cursor-pointer ${
          active ? "visible" : "hidden"
        }`}
      >
        <div className="flex justify-start">
          <Checkbox
            checked={checked}
            onChange={async (e: CheckboxChangeEvent) => {
              const res = await fetch(`/api/QuestsOnCharacter/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  quest: quest,
                  trueorfalse: e.target.checked,
                  character: character,
                }),
              });
              if (res.ok) {
                const temp = charz;
                temp![currindex!] = e.target.checked;

                setCharz(temp);

                setChecked(e.target.checked);
              } else {
                console.log(res.status);
              }
            }}
          ></Checkbox>
        </div>

        <div
          className="flex-1 flex-row flex justify-between"
          onClick={showDrawer}
        >
          <h3 className="pl-2 m-0  ">
            {quest.optionalTitle ? quest.optionalTitle : quest?.value}
          </h3>
          <div className={`pl-2 m-0 pr-5 text-base   `}>
            {/* <div className={`${styles.font}`}>{quest.repeatable}</div> */}
          </div>
        </div>
      </div>
      <Drawer
        style={{ backgroundColor: "#1e293b" }}
            closeIcon={<CloseOutlined style={{color: "white"}}></CloseOutlined>}
        className="text-offwhite-50 fill-white"
        title={
          <label style={{ color: "White" }}>
            {quest.optionalTitle ? quest.optionalTitle : quest?.value}
          </label>
        }
        placement="right"
        onClose={onClose}
        open={open}
      >
        {quest.optionalTitle && <div>Quest Name: {quest?.value}</div>}
        <div className="pb-2">Category: {quest?.category}</div>
        {quest?.description && <div className="pb-2">{quest?.description}</div>}
        <div className="pb-2 ">Repeatable: {quest?.repeatable}</div>
        {quest?.location && (
          <div className="pb-2">Location: {quest?.location}</div>
        )}
        {quest?.questGiver && (
          <div className="pb-2">Quest Giver: {quest?.questGiver}</div>
        )}
        {quest?.reward && <div className="pb-2">Reward: {quest?.reward}</div>}
        {quest?.uespLink && (
          <Link className="" href={`${quest?.uespLink}`}>
            {quest?.uespLink}
          </Link>
        )}
      </Drawer>
    </>
  );
};

export default QuestRow;
