import { NextPage } from "next";
import List, { ListProps } from "../list/list";
import { useSession } from "next-auth/react";
import Listmodal from "../list/listModal";
import { Button, Drawer, Radio, RadioChangeEvent, Select, Space } from "antd";
import Layout from "../layout";
import QuestCategory from "../quests/questCategory";
import moment from "moment";
import { useEffect, useState } from "react";
import Link from "next/link";
import YourDailiesHeader from "./yourDailiesHeader";
import { refreshData } from "../../pages/yourdailies";
import { CloseOutlined } from "@ant-design/icons";

export type User = {
	// id: string;
	name: string;
	createdAt: string;
	checkedTasks?: string;
	characters?: Character[];
	email: string;
	customQuests: Quest[];
};

export type Quest = {
	value: string;
	category?: string;
	optionalTitle: string | null;
	description?: string;
	repeatable?: string;
	location?: string;
	questGiver?: string;
	uespLink?: string;
	reward?: string;
};

export interface Props {
	user: User;
	lists?: ListProps[];
	error?: string;
	quests?: Quest[];
	categories: string[];
}

export type Character = {
	value: string;
	name: string;
	owner: User;
	questsOnCharacter?: QuestsOnCharacter[];
};

export type QuestsOnCharacter = {
	character: User;
	quest: Quest;
	characterId: string;
	questName: string;
};

type drawerText = {
	category: string;
	description: string;
	repeatable: string;
	location: string;
	questgiver: string;
	reward: string;
	link: string;
	title: string;
	alignment?: string;
};

const YourDailiesChecklist: NextPage<Props> = ({ user, lists, quests, categories }) => {
	const { data: session, status } = useSession();
	if (!session) {
		return <div>access denied</div>;
	}
	const [currentCharacter, selectCurrentCharacter] = useState(user.characters![0]);

	//Drawer stuff
	const [open, setOpen] = useState(false);
	const defaultDrawerText = {
		category: "",
		description: "",
		repeatable: "",
		location: "",
		questgiver: "",
		reward: "",
		link: "",
		title: "",
	} as drawerText;

	const [drawerTextInfo, setDrawerTextInfo] = useState(defaultDrawerText);
	const showDrawer = (
		category: string,
		description: string,
		repeatable: string,
		location: string,
		questgiver: string,
		reward: string,
		link: string,
		title: string,
		alignment: string = "right",
	) => {
		if (open === true) {
			return;
		}

		if (alignment !== "left" && alignment !== "right") {
			alignment = "right";
		}

		const textData = {
			category: category,
			description: description,
			repeatable: repeatable,
			location: location,
			questgiver: questgiver,
			reward: reward,
			link: link,
			title: title,
			alignment: alignment || "right",
		} as drawerText;
		setDrawerTextInfo(textData);
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	//Display the UTC reset time (6am UTC) in the users own time zone
	const [time, setTime] = useState("00:00:00");
	useEffect(() => {
		let utcTimeDaily = "2023-03-07 07:00:00";
		let localDailyReset = moment.utc(utcTimeDaily).local().format("HH:mm:ss");
		setTime(localDailyReset);
	}, []);

	//Categories for the possible quests. Hardcoded for now...

	const [categoriesToDisplay, setCategoriesToDisplay] = useState<string[]>([]);
	const [questsToDisplay, setQuestsToDisplay] = useState(quests);

	const characterOptions = user.characters?.map((character) => ({
		value: character.value,
		label: character.name,
	}));
	//Adding the users lists to the list selector dropdown
	const listOptions = lists?.map((list) => ({
		value: list.title,
		label: list.title,
		key: list.id,
	}));
	listOptions?.unshift({
		value: "Default List",
		label: "Default List",
		key: "default",
	});

	const [characterSelectedValue, setCharacterSelectedValue] = useState(user.characters![0].name);

	//Setting the character to the first one on your account, or their last selected one if it exists
	useEffect(() => {
		if (user.characters?.length === 0) {
		} else {
			if (localStorage.getItem("character") === null) {
				setCharacterSelectedValue(user.characters![0].name);
			} else {
				const localStorageChar = localStorage.getItem("character");
				user.characters?.forEach((character) => {
					if (character.value === localStorageChar) {
						handleChangeCharacter(localStorageChar!);
						setCharacterSelectedValue(localStorageChar!);
					}
				});
			}
		}
	}, []);

	//Setting the current list to the last selected one if it exists on page reload
	const [listSelectedValue, setListSelectedValue] = useState("Default List");
	useEffect(() => {
		if (localStorage.getItem("list") === null) {
			setCategoriesToDisplay(categories);
		} else {
			const localStorageList = localStorage.getItem("list");
			let exists = false;
			lists?.forEach((list) => {
				if (list.title === localStorageList) {
					handleListChange(localStorageList!);
					setListSelectedValue(localStorageList!);
					exists = true;
				}
			});
			if (!exists) {
				handleListChange("Default List");
			}
		}
	}, []);

	//Changes the selected list based off the lists title
	const handleListChange = (value: string) => {
		setListSelectedValue(value);
		localStorage.removeItem("list");
		localStorage.setItem("list", value);

		if (value === "Default List") {
			setQuestsToDisplay(quests);
			setCategoriesToDisplay(categories);
		} else {
			const listFinder = lists!.filter(function (el) {
				return el.title === value;
			}); //Gets the list that the user selected from the selector.
			const listQuests = listFinder![0].tasks!.map((e) => {
				return e.value;
			}); // Returns all quests from the selected list
			const questsOnListFinder = quests!.filter(function (el) {
				if (listQuests.includes(el.value)) return el.value;
			}); // Finds the quests that have the selected lists quests.
			setQuestsToDisplay(questsOnListFinder);

			let categoriesOnListQuests = listFinder![0].tasks!.map((e) => {
				return e.category;
			}); // Returns all the categories of quests on the selected list
			let unique = categoriesOnListQuests.filter(function (elem, index, self) {
				return index === self.indexOf(elem);
			}); // Returns the unique categorys of quests

			// if (!quests?.some((el) => el.category === "Custom Quests")) {
			// 	unique = unique.filter(function (e) {
			// 		return e !== "Custom Quests";
			// 	});
			// }
			//console.log(unique);
			//@ts-ignore
			setCategoriesToDisplay(unique);
		}
	};

	useEffect(() => {
		let exists = lists?.some((list) => list.title === listSelectedValue);
		if (listSelectedValue === "Default List") {
			exists = true;
		}
		if (!exists) {
			handleListChange("Default List");
		}
	}, [lists]);
	//Changes the selected character based of the characters name.
	const handleChangeCharacter = (value: string) => {
		setCharacterSelectedValue(value);
		localStorage.removeItem("character");
		localStorage.setItem("character", value);

		const selectedChar = user.characters!.filter(function (el, index) {
			return el.value === value;
		});

		selectCurrentCharacter(selectedChar[0]);
	};

	//Filter for daily or weekly quests
	const [filter, setFilter] = useState<"All Quests" | "daily" | "weekly">("All Quests");
	const handleFilterChange = ({ target: { value } }: RadioChangeEvent) => {
		setFilter(value);
	};

	return (
		<>
			<Layout>
				<div className={`pb-4 pt-2 pl-4 pr-4  relative min-h-full sm:min-h-screen bg-[#0f0f0f]`}>
					<div className="flex flex-col lg:flex-row md:flex-row  justify-center md:pb-2 pb-6">
						<div className="text-slate-300 pb-2 text-center ">
							{`Daily quests reset at ${time} each day`}
						</div>
						<div className="text-slate-300 pl-0  lg:pl-5 md:pl-5 text-center pb-6 md:pb-0 ">
							{`Weekly quests reset at ${time} on monday`}
						</div>
					</div>

					<div className="flex  sm:space-x-0 lg:space-x-5 md:space-x-3 flex-col  md:flex-row lg:flex-row justify-between relative">
						<div
							className={`w-full flex flex-col md:grid md:h-full  lg:grid-cols-3 md:grid-cols-2 gap-3  pt-32 md:pt-0 `}
						>
							{/* Displaying Quests */}

							{categories.map((category) => (
								<QuestCategory
									key={category}
									quests={quests?.filter(function (el) {
										return el.category === category;
									})}
									category={category}
									user={user}
									character={currentCharacter}
									categoriesToDisplay={categoriesToDisplay}
									questsToDisplay={questsToDisplay!}
									filter={filter}
									showDrawer={showDrawer}
								></QuestCategory>
							))}
						</div>

						<div className="flex flex-col space-y-3 lg:w-1/3 md:w-1/3 sm:w-full lg:mt-0 md:mt-0 mt-14  ">
							<div className="w-full flex justify-center    select-none md:relative absolute md:top-0 -top-8 ">
								{/* Filter Selector */}
								<Radio.Group
									options={[
										{ value: "All Quests", label: "All Quests" },
										{ value: "daily", label: "Daily Quests" },
										{ value: "weekly", label: "Weekly Quests" },
									]}
									onChange={handleFilterChange}
									value={filter}
									optionType="button"
									buttonStyle="solid"
								/>
							</div>
							{/* Character Selector */}
							<Space
								direction="vertical"
								key="test233"
								wrap
								style={{ width: "100%" }}
								className="md:relative absolute md:top-0 top-10 "
							>
								<Select
									className=""
									defaultValue={user.characters![0].name}
									value={characterSelectedValue}
									style={{ width: "100%" }}
									onSelect={handleChangeCharacter}
									options={characterOptions}
								/>
							</Space>

							{/* List Selector */}
							<Space
								direction="vertical"
								key="test2"
								wrap
								style={{ width: "100%" }}
								className="md:relative absolute top-0 "
							>
								<Select
									className=""
									defaultValue={"Default List"}
									style={{ width: "100%" }}
									value={listSelectedValue}
									onSelect={handleListChange}
									options={listOptions}
								/>
							</Space>

							<Listmodal quests={quests} categories={categories}></Listmodal>
							{lists?.map((list: any) => (
								<List showDrawer={showDrawer} key={list.id} list={list}></List>
							))}
						</div>
					</div>
				</div>
			</Layout>
			<Drawer
				style={{ backgroundColor: "#121212" }}
				closeIcon={
					<CloseOutlined
						className="scale-[200%] md:scale-100 mt-1"
						style={{ color: "white" }}
					></CloseOutlined>
				}
				rootClassName="text-offwhite-50 fill-white break-words "
				title={<label style={{ color: "White" }}>{drawerTextInfo.title}</label>}
				//@ts-ignore
				placement={drawerTextInfo.alignment}
				onClose={onClose}
				open={open}
				mask={window.innerWidth > 768 ? true : true}
				width={window.innerWidth > 768 ? window.innerWidth * 0.4 : window.innerWidth}
			>
				<div className="overflow-hidden overflow-y-hidden h-full flex flex-col">
					<div className="pb-2">Category: {drawerTextInfo.category}</div>
					<div className="pb-2">Description {drawerTextInfo.description}</div>
					<div className="pb-2 ">Repeatable: {drawerTextInfo.repeatable}</div>
					<div className="pb-2">Location: {drawerTextInfo.location}</div>
					<div className="pb-2">Quest Giver: {drawerTextInfo.questgiver}</div>
					<div className="pb-2">Reward: {drawerTextInfo.reward}</div>
					<Link className="" href={drawerTextInfo.link}>
						{drawerTextInfo.link}
					</Link>
					<div
						className="pb-2  flex h-full mt-4 "
						onClick={() => {
							onClose();
						}}
					></div>
				</div>
			</Drawer>
		</>
	);
};

export default YourDailiesChecklist;
