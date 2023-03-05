import React from "react";

import { Quest, User } from "../../pages/yourdailies";
import QuestRow from "./QuestRow";

const QuestCategory: React.FC<{
  quests: Quest[] | undefined;
  name: String;
  user?: User
}> = ({ quests, name, user }) => {
  return (
    <div className="bg-slate-300 flex flex-col h-full">
      <h4 className="py-0 my-0 border-b-2 border-solid border-r-0 border-l-0 border-t-0 relative">
        {name}
        <small className="absolute right-0 "></small>
      </h4>
      <small>
        {quests?.map((quest: any, index) => (
          <QuestRow key={index} quest={quest} user={user}></QuestRow>
        ))}
      </small>
    </div>
  );
};

export default QuestCategory;
