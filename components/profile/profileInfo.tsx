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
import CustomQuestModal from "../customQuests/customQuiestModal";
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
	console.log(user);
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
				<div className={`pl-4 pr-4 flex flex-col   min-h-screen`}>
					<div className="flex  justify-center   ">
						<div className=" ml-10  sm:ml-40 mr-10 sm:mr-40 w-screeen text-center pr-3 border-b-2 border-t-0 border-l-0  pb-10 border-r-0 s text-offwhite-50 flex flex-col w-max sm:flex-col justify-center sm:pr-0">
							<div className="flex  justify-center     ">
								<div className=" mt-10    text-offwhite-50 flex flex-col w-max  justify-center  mb-10  ">
									<div className="border-t-0 border-l-0  border-b-2 border-r-0  border-solid -mr-3 sm:mr-0">
										Your Profile
									</div>

									<div>Name: {user.name}</div>
									<div>Email: {user.email}</div>
								</div>
							</div>
							<div className="flex flex-col sm:flex-row">
								<div className="flex flex-col ">
									<div
										className="border-solid border-b-2 border-t-0 border-l-0 border-r-0 w-full pr-3
                 mr-0 sm:mr-5  md:w-56 lg:w-96 "
									>
										Your Characters
										<EditOutlined
											onClick={() => {
												setEditMode((editMode) => {
													return !editMode;
												});
											}}
											className=" ml-2 rounded-sm hover:bg-gray-700 transition ease-in-out delay-75 hover:scale-110 duration-100"
										/>
									</div>
									{user.characters?.map((character) => (
										<CharacterRow
											helperFunction={helperFunction}
											editMode={editMode}
											key={character.value}
											user={user}
											character={character}
										></CharacterRow>
									))}
								</div>
								<div>
									<CharacterModel helperFunction={helperFunction} user={user}></CharacterModel>
								</div>
							</div>
						</div>
					</div>
					<div className="">
						<div className="justify-center flex pt-0 text-offwhite-50">
							<div className="flex flex-col sm:flex-row  border-b-2 border-t-0 border-l-0  pb-10 border-r-0 border-solid text-offwhite-50 ">
								<div className="flex flex-col">
									<div
										className="border-solid border-b-2 border-t-0 border-l-0 border-r-0 w-full pr-3
                 mr-0 sm:mr-5  md:w-56 lg:w-96 text-center"
									>
										Your Custom Quests
										<EditOutlined
											onClick={() => {
												setQuestEditMode((editMode) => {
													return !editMode;
												});
											}}
											className=" ml-2 rounded-sm hover:bg-gray-700 transition ease-in-out delay-75 hover:scale-110 duration-100"
										/>
									</div>
									{user.customQuests.map((quest) => (
										<CustomQuestRow
											key={quest.value}
											quest={quest}
											editMode={questEditMode}
										></CustomQuestRow>
									))}
								</div>
								<CustomQuestModal></CustomQuestModal>
							</div>
						</div>
					</div>

					{numOfChars > 0 && (
						<div className="">
							<div className="justify-center flex">
								<Link className="text-center flex pt-5 w-max" href={"/yourdailies"}>
									<Button key="test" type="primary">
										View Your Daily Checklist
									</Button>
								</Link>
							</div>
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
