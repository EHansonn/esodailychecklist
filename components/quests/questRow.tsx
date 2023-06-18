import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Checkbox, ConfigProvider, Drawer } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Character, Quest, User } from "../DailyChecklist/dailiesCheckList";
import { CloseOutlined } from "@ant-design/icons";
export type questProps = {
	quest: Quest;
};

export type charChecked = {
	boolVal: boolean;
	character: Character;
};

export type allChecked = [charChecked: charChecked];

const QuestRow: React.FC<{
	quest: Quest;
	selectedCharacter?: Character;
	characters?: Character[];
	questsToDisplay?: Quest[];
	filter: string;
}> = ({ quest, selectedCharacter, characters, questsToDisplay, filter }) => {
	//Antd Drawer stuff.
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	//Background color of the checkbox. Default white, will be changed to red if the api gives a !ok response.
	const [bgColor, setBgColor] = useState("#ffffff");

	//Active determines if the quest is hidden or not.
	const [active, setActive] = useState(false);

	useEffect(() => {
		setActive(false);

		questsToDisplay!.forEach((el) => {
			if (el.value === quest.value) {
				setActive(true);
			}
		});

		if (quest.repeatable === filter || filter === "All Quests") {
			//setActive(true);
		} else {
			setActive(false);
		}
	}, [, quest, questsToDisplay, filter]);

	//Checking to see which quests the user has selected on their characters and storing it in an object.
	const allCharacters: allChecked = characters?.map((character) => {
		let containsValue = false;
		if (character.questsOnCharacter?.some((e) => e.questName === quest.value)) {
			containsValue = true;
		}
		return {
			boolVal: containsValue,
			character: character,
		} as charChecked;
	}) as allChecked;
	const [usersCharacters, setUsersCharacters] = useState(allCharacters);

	//Updated the userCharacters state. If you pass it a bool value, it will change the current characters bool val to that. otherwise itll just set it will determine if character from the api data contains it.
	const updateHandler = (value?: boolean) => {
		const allCharacters: allChecked = characters?.map((character) => {
			let containsValue;
			if (value !== undefined && character.name === selectedCharacter?.name) {
				containsValue = value;
			} else {
				containsValue = character.questsOnCharacter?.some((e) => e.questName === quest.value) ? true : false;
			}

			return {
				boolVal: containsValue,
				character: character,
			} as charChecked;
		}) as allChecked;
		setUsersCharacters(allCharacters);
	};

	//Updating the values whenever the api refetches data (every 60s). Allows you to use it on multiple devices at once.
	useEffect(() => {
		updateHandler();
	}, [characters]);

	//Checkbox value's state.
	const [checked, setChecked] = useState(false);

	//Checking to see if the user has selected the current quest, and updating the checkbox's value.
	useEffect(() => {
		usersCharacters.forEach((current) => {
			if (current.character.name === selectedCharacter?.name) {
				setChecked(current.boolVal);
			}
		});
	}, [usersCharacters, selectedCharacter, characters]);

	//Changing the error color back to normal if the user switches characters.
	useEffect(() => {
		setBgColor("#ffffff");
	}, [selectedCharacter]);

	return (
		<>
			<div
				className={`flex flex-row my-4 md:my-2 pl-4 md:pl-2 pb-[2px] justify-between  hover:bg-slate-600 cursor-pointer ${
					active ? "visible" : "hidden"
				}`}
			>
				<div className="flex justify-start">
					<ConfigProvider
						theme={{
							components: {
								Checkbox: {
									colorBgContainer: bgColor,
								},
							},
						}}
					>
						<Checkbox
							className="scale-[200%] md:scale-100 mr-2 md:mr-0"
							checked={checked}
							onChange={async (e: CheckboxChangeEvent) => {
								try {
									setChecked(e.target.checked);
									const res = await fetch(`/api/QuestsOnCharacter/`, {
										method: "PUT",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify({
											quest: quest,
											trueorfalse: e.target.checked,
											character: selectedCharacter,
										}),
									});
									if (res.ok) {
										updateHandler(e.target.checked);
										setBgColor("#ffffff");
									} else {
										throw new Error("Something went wrong");
									}
								} catch (error) {
									setBgColor("#f5222d");
									setChecked(false);
								}
								// To reduce API Calls, i've set the API to only refresh every 60 seconds. Whenever the api refreshes it will overwrite what ever changes the clientside has made between the refreshes
								// refreshData();
							}}
						></Checkbox>
					</ConfigProvider>
				</div>

				<div className="flex-1 flex-row flex justify-between" onClick={showDrawer}>
					<h3 className={`pl-2 m-0 select-none ${checked ? "line-through text-[#3478ff]" : ""} `}>
						{quest.optionalTitle ? quest.optionalTitle : quest?.value}
					</h3>
					<div className={`pl-2 m-0 pr-5 text-base   `}>
						{/* <div className={`${styles.font}`}>{quest.repeatable}</div> */}
					</div>
				</div>
			</div>
			<Drawer
				style={{ backgroundColor: "#121212" }}
				closeIcon={<CloseOutlined style={{ color: "white" }}></CloseOutlined>}
				className="text-offwhite-50 fill-white"
				title={
					<label style={{ color: "White" }}>{quest.optionalTitle ? quest.optionalTitle : quest?.value}</label>
				}
				placement="right"
				onClose={onClose}
				open={open}
			>
				<div className="pb-2">Category: {quest?.category}</div>
				{quest?.description && <div className="pb-2">{quest?.description}</div>}
				<div className="pb-2 ">Repeatable: {quest?.repeatable}</div>
				{quest?.location && <div className="pb-2">Location: {quest?.location}</div>}
				{quest?.questGiver && <div className="pb-2">Quest Giver: {quest?.questGiver}</div>}
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
