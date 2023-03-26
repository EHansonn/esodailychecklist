import React, { useEffect, useState } from "react";

import { Character, Quest, User } from "../DailyChecklist/dailiesCheckList";
import QuestRow from "./questRow";

const QuestCategory: React.FC<{
	quests: Quest[] | undefined;
	category: String;
	user?: User;
	character?: Character;
	categoriesToDisplay: string[];
	questsToDisplay: Quest[];
	filter: string;
}> = ({ quests, category, user, character, categoriesToDisplay, questsToDisplay, filter }) => {
	const [active, setActive] = useState(false);

	let containsDaily = false;
	let containsWeekly = false;

	questsToDisplay?.forEach((quest) => {
		if (quest.repeatable === "daily" && quest.category === category) {
			containsDaily = true;
		}
		if (quest.repeatable === "weekly" && quest.category === category) {
			containsWeekly = true;
		}
	});

	useEffect(() => {
		setActive(false);

		categoriesToDisplay.forEach((el) => {
			if (el === category) {
				setActive(true);
			}
		});

		if (filter === "daily" && !containsDaily) {
			setActive(false);
		}
		if (filter === "weekly" && !containsWeekly) {
			setActive(false);
		}
	}, [, category, categoriesToDisplay, filter]);
	return (
		<div className={`bg-slate-800 flex flex-col h-full rounded-lg text-offwhite-50 ${active ? "" : "hidden"}`}>
			<h4 className="py-0 my-0 border-b-2 border-solid border-r-0 border-l-0 border-t-0 relative truncate pl-2 select-none">
				{category}
				<small className="absolute right-0 "></small>
			</h4>
			<small>
				{quests?.map((quest: any, index) => (
					<QuestRow
						key={index}
						quest={quest}
						selectedCharacter={character}
						characters={user?.characters}
						questsToDisplay={questsToDisplay}
						filter={filter}
					></QuestRow>
				))}
			</small>
		</div>
	);
};

export default QuestCategory;
