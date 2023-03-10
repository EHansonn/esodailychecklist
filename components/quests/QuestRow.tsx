import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { Checkbox, Drawer } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Character, Quest, User } from "../../pages/yourdailies";
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
  user?: User;
  character?: Character;
  currindex?: number;
  numberofchars?: number;
  characters?: Character[];
}> = ({ quest, user, character, characters, currindex, numberofchars }) => {
  const [open, setOpen] = useState(false);
  //  console.log(character);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const values = characters?.map((charactere) => {
    const quests = charactere.questsOnCharacter?.filter(function (e) {
      return e.questName === (quest.value || quest.optionalTitle);
    });
    //console.log(quests);
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
      <div className="flex flex-row my-2 pl-2 justify-between hover:bg-slate-600 cursor-pointer">
        <div className="flex justify-start">
          <Checkbox
            checked={checked}
            onChange={async (e: CheckboxChangeEvent) => {
              const res = await fetch(`/api/QuestsOnCharacter/${character}`, {
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
                const res2 = await fetch(
                  `/api/QuestsOnCharacter/${character}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      quest: quest,
                      trueorfalse: e.target.checked,
                      character: character,
                    }),
                  }
                );
                if (res2.ok) {
                  const temp = charz;
                  temp![currindex!] = e.target.checked;
                  // console.log("tester");
                  // console.log(temp);
                  setCharz(temp);
                  // console.log("another test lol");
                  // console.log(charz);
                  setChecked(e.target.checked);
                }
                console.log(res2);
              }

              //Router.push("/yourdailies");

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
