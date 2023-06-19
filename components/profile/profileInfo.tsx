import { NextPage } from "next";
import { ListProps } from "../list/list";
import { useSession } from "next-auth/react";
import { Alert, Button } from "antd";
import Layout from "../layout";
import { useEffect, useState } from "react";
import { Quest, User } from "../DailyChecklist/dailiesCheckList";
import CharacterRow from "../character/characterRow";
import CharacterModel from "../character/characterModel";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import CustomQuestModal from "../customQuests/customQuestModal";
import CustomQuestRow from "../customQuests/customQuestRow";
interface Props {
	user: User;
	lists?: ListProps[];
	error?: string;
	quests?: Quest[];
}

const ProfileInfo: NextPage<Props> = ({ user }) => {
	const { data: session, status } = useSession();
	const [editMode, setEditMode] = useState(false);
	const [questEditMode, setQuestEditMode] = useState(false);

	const [numOfChars, setNumOfChars] = useState(user.characters?.length || 0);
	const helperFunction = (val: number) => {
		setNumOfChars((currVal) => {
			let temp = currVal + val;
			if (temp < 0) {
				temp = 0;
			}
			return temp;
		});
	};

	useEffect(() => {
		setNumOfChars(user.characters?.length || 0);
	}, [user]);

	if (session) {
		return (
			<Layout>
				<div className=" w-max m-auto text-offwhite-50 mb-10 border-b-2 border-solid border-l-0 border-r-0 border-0 pb-4">
					<h1 className="border-b-2 border-solid border-l-0 border-r-0 border-0">Settings</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
						{/* Custom Quests */}
						<div>
							<h2 className="font-extrabold">Custom Quests</h2>
							<h3>Add New Quest</h3>
							<CustomQuestModal></CustomQuestModal>

							<h3>Current Custom Quests</h3>

							{user.customQuests.map((quest) => (
								<CustomQuestRow key={quest.value} quest={quest} editMode={true}></CustomQuestRow>
							))}
						</div>
						{/* Custom Characters */}
						<div className="">
							<h2 className="font-extrabold">Characters</h2>
							<h3>Add New Character</h3>
							<CharacterModel helperFunction={helperFunction} user={user}></CharacterModel>

							<h3>Current Characters</h3>
							{user.characters?.map((character) => (
								<CharacterRow
									helperFunction={helperFunction}
									editMode={true}
									key={character.value}
									user={user}
									character={character}
								></CharacterRow>
							))}
						</div>
					</div>
				</div>

				<div className={`pl-4 pr-4 flex flex-col   min-h-screen `}>
					{numOfChars > 0 && (
						<div className="justify-center flex pb-5">
							<Link className="text-center flex pt-5 w-max" href={"/yourdailies"}>
								<Button key="test" type="primary">
									View Your Daily Checklist
								</Button>
							</Link>
						</div>
					)}
					{numOfChars === 0 && (
						<div className="flex justify-center pt-5 ">
							<Alert message="Please add at least one character" type="warning" />
						</div>
					)}
				</div>
			</Layout>
		);
	}
	return <div>access denied</div>;
};

export default ProfileInfo;
//JSON.parse(JSON.stringify(u))
