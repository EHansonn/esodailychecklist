import React from "react";
import { User } from "../../pages/yourdailies";
import QuestRow from "../quests/QuestRow";
import Router from "next/router";
import styles from "../../pages/index.module.css";
export type ListProps = {
  tasks: QuestProps[] | undefined;
  id: string;
  title: string;
  owner: {
    name: string;
    email: string;
  } | null;
  content: string | null;
  userId: string;
};

export type QuestProps = {
  value: string;
  category: string;
  optionTitle: string | null;
  description: string | null;
  repeatable: string;
  location: string | null;
  questGiver: string | null;
  uespLink: string | null;
  reward: string | null;
};

const List: React.FC<{ list: ListProps; user: User }> = ({ list, user }) => {
  console.log(list);
  // console.log(list);
  // <Link href={`/list/${list.id}`}
  // console.log(123123);
  //console.log(list?.tasks[0].quest.value);
  return (
    <div className={`flex flex-col object-contain text-black `}>
      <h4 className="mt-0 mb-0">{list.title}</h4>
      <h4 className="mt-0 mb-2">{list.content}</h4>
      <h4 className="mt-0 mb-0">Selected Quests:</h4>
      <div className="flex flex-col">
        {list?.tasks!.map((e: any) => {
          return (
            <div key={e.value}>
              <>
                <div
                  className={`flex flex-row my-1 pl-0 justify-between hover:bg-slate-200 ${styles.font} `}
                >
                  <div className="flex justify-start"></div>

                  <div className="flex-1 flex-row flex justify-between">
                    <h4 className="pl-2 m-0 ">
                      {e.optionalTitle ? e.optionalTitle : e?.value}
                    </h4>
                    <div className="pl-2 m-0 pr-5 ">
                      <div>{e.repeatable}</div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
