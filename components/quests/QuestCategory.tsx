import React, { useEffect, useState } from "react";

import { Character, Quest, User } from "../DailyChecklist/dailieschecklist";
import QuestRow from "./QuestRow";

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
	const [categoriesz, setCategoriesz] = useState(categoriesToDisplay);
	useEffect(() => {
		setActive(false);
		setCategoriesz(categoriesToDisplay);
	}, [categoriesToDisplay, categoriesz]);

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
		categoriesz.forEach((el) => {
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
	}, [, category, categoriesToDisplay, categoriesz, filter]);
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
