import React, { useEffect, useState } from "react";

import { Character, Quest, User } from "../DailyChecklist/dailiesCheckList";
import UnauthQuestRow from "./unauthQuestRow";

const UnauthQuestCategory: React.FC<{
	quests: Quest[] | undefined;
	category: string;
}> = ({ quests, category }) => {
	return (
		<div
			className={`border-offwhite-50   border-solid  border-t-0 border-l-0 border-b-0 border-r-0 flex flex-col text-xl  rounded-lg text-offwhite-50  $`}
		>
			<h3 className="py-0 my-0  border-solid border-r-0 border-l-0 border-t-0 border-b-2 relative truncate pl-2 select-none">
				{category}
				<small className="absolute right-0 "></small>
			</h3>
			<small>
				{quests?.map((quest: any, index) => (
					<UnauthQuestRow key={index} quest={quest}></UnauthQuestRow>
				))}
			</small>
		</div>
	);
};

export default UnauthQuestCategory;
