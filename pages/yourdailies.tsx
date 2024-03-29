import { signIn, useSession } from "next-auth/react";
import YourDailiesHeader from "../components/DailyChecklist/yourDailiesHeader";
import YourDailiesChecklist, { Quest } from "../components/DailyChecklist/dailiesCheckList";
import useSWR, { mutate } from "swr";
import LoadingSpinner from "../components/loading/loadingSpinner";
import LoadingError from "../components/loading/loadingError";
import Layout from "../components/layout";
import UnauthQuestCategory from "../components/quests/unauthQuestCategory";
import { Button } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import CharacterModel from "../components/character/characterModel";

export const refreshData = () => {
	//Triggers swr to refetch data
	mutate("api/user");
};
export const CATEGORIES = [
	"Weekly Tasks and Trials",
	"Daily Tasks",
	"Custom Quests",
	"Craglorn Quests",
	"PvP Quests",
	"Imperial City Quests",
	"Guild Daily Quests",
	"Wrothgar Quests",
	"Thieves Guild Quests",
	"Gold Coast Quests",
	"Vvardenfell Quests",
	"Clockwork City Quests",
	"Summerset Quests",
	"Murkmire Quests",
	"Elsweyr Quests",
	"Dragonhold Quests",
	"Western Skyrim Quests",
	"The Reach Quests",
	"Blackwood Quests",
	"Deadlands Quests",
	"High Isle Quests",
	"Galen Quests",
	"Necrom Quests",
	"Cyrodiil Settlement Quests",
	"Miscellaneous",
];
export default function Dailies() {
	const { data: session, status } = useSession();
	//Fetching user data
	const fetcher = async () => {
		const response = await fetch("/api/user");

		if (!response.ok) {
			const error = new Error("An error occurred while fetching the data.");
			throw error;
		}

		const data = await response.json();
		return data.data;
	};
	const { data, error } = useSWR("api/user", fetcher, {
		refreshInterval: 1000,
	});

	const [quests, setQuests] = useState<Quest[] | null>(null);
	useEffect(() => {
		//if (status === "unauthenticated") {
		const questFetcher = async () => {
			const response = await fetch("/api/quest");
			if (response.ok) {
				const data = await response.json();
				setQuests(data);
			}
		};
		questFetcher();
		//}
	}, []);

	//Hardcoded, for now...
	let categories = CATEGORIES;

	if (!session) {
		return (
			<>
				<YourDailiesHeader></YourDailiesHeader>
				{status === "loading" && <LoadingSpinner text={"your dailies"} />}
				{status === "unauthenticated" && (
					<>
						<Layout>
							<div className="content-center text-center bg-neargrey-50">
								<div className="text-white text-center pb-5 pt-5">{`Please sign in to view your own personalized checklist`}</div>
								<Button
									className="w-40"
									type="primary"
									onClick={(e) => {
										signIn();
									}}
								>
									Sign In
								</Button>
							</div>
							<div className={`pb-4 pt-2 pl-4 pr-4  relative min-h-screen  bg-neargrey-50`}>
								<div className="flex flex-col lg:flex-row md:flex-row  justify-center"></div>
								<div className="content-center text-center ">
									<h2 className="text-white text-center pb-5 pt-5">Possible Dailies</h2>
								</div>
								{quests && (
									<div className="flex  sm:space-x-0 lg:space-x-5 md:space-x-3 flex-col  md:flex-row lg:flex-row justify-between relative">
										<div
											className={`w-full grid grid-cols-1  h-full lg:grid-cols-3 md:grid-cols-2 gap-3   auto-cols-1 md:ml-20 md:mr-20   `}
										>
											{/* Displaying Quests */}
											{categories
												.filter((category) => {
													return category !== "Custom Quests";
												})
												.map((category) => (
													<UnauthQuestCategory
														key={category}
														quests={quests?.filter(function (el: any) {
															return el.category === category;
														})}
														category={category}
													></UnauthQuestCategory>
												))}
										</div>
									</div>
								)}
							</div>
						</Layout>
					</>
				)}
			</>
		);
	}

	if (error) return <LoadingError text={"daily checklist"} />;

	if (!data) return <LoadingSpinner text={"checklist"} />;
	if (!quests) return <LoadingSpinner text={"checklist"} />;
	if (!data.user.characters[0]) {
		return (
			<Layout>
				<YourDailiesHeader></YourDailiesHeader>
				<div className="content-center text-center min-h-screen bg-neargrey-50 overflow">
					<h3 className="text-white">Create a new character</h3>
					<div className="text-offwhite-50 w-100% text-center pb-5 pt-5 flex px-4 md:px-0 justify-center">
						<CharacterModel helperFunction={() => {}} user={data.user}></CharacterModel>
					</div>
					{/* <Link href={"/profile"}>
						<Button type="primary">Create a Character</Button>
					</Link> */}
				</div>
			</Layout>
		);
	}

	return (
		<>
			<YourDailiesHeader></YourDailiesHeader>
			<YourDailiesChecklist
				categories={categories}
				user={data.user}
				lists={data.lists}
				quests={quests}
			></YourDailiesChecklist>
		</>
	);
}
