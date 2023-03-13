import React, { useEffect, useState } from "react";

import { Character, Quest, User } from "../../pages/yourdailies";
import QuestRow from "./QuestRow";

const QuestCategory: React.FC<{
  quests: Quest[] | undefined;
  name: String;
  user?: User;
  character?: Character;
  currindex?: number;
  categoriesToDisplay: string[];
  questsToDisplay: Quest[];
}> = ({
  quests,
  name,
  user,
  character,
  currindex,
  categoriesToDisplay,
  questsToDisplay,
}) => {
  const [active, setActive] = useState(false);
  const [categoriesz, setCategoriesz] = useState(categoriesToDisplay);
  //console.log(categoriesz)
  useEffect(() => {
    setActive(false);
    setCategoriesz(categoriesToDisplay);
  }, [categoriesToDisplay, categoriesz]);

  useEffect(() => {
    categoriesz.forEach((el) => {
      if (el === name) {
        setActive(true);
      }
    });
  }, [, name, categoriesToDisplay, categoriesz]);
  return (
    <div
      className={`bg-slate-800 flex flex-col h-full rounded-lg text-offwhite-50 ${
        active ? "" : "hidden"
      }`}
    >
      <h4 className="py-0 my-0 border-b-2 border-solid border-r-0 border-l-0 border-t-0 relative truncate pl-2">
        {name}
        <small className="absolute right-0 "></small>
      </h4>
      <small>
        {quests?.map((quest: any, index) => (
          <QuestRow
            key={index}
            quest={quest}
            user={user}
            character={character}
            currindex={currindex}
            characters={user?.characters}
            questsToDisplay={questsToDisplay}
          ></QuestRow>
        ))}
      </small>
    </div>
  );
};

export default QuestCategory;
