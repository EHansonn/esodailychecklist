import { signIn, useSession } from "next-auth/react";
import YourDailiesHeader from "../components/DailyChecklist/yourDailiesHeader";
import YourDailiesChecklist, { Quest } from "../components/DailyChecklist/dailiesCheckList";
import { LoadingOutlined } from "@ant-design/icons";
import useSWR, { mutate } from "swr";
import LoadingSpinnerComponent from "../components/loading/loadingSpinner";
import LoadingError from "../components/loading/loadingError";
import Layout from "../components/layout";
import UnauthQuestCategory from "../components/quests/unauthQuestCategory";
import { Button } from "antd";
import { useEffect, useState } from "react";
export const refreshData = () => {
	//Triggers swr to refetch data
	mutate("api/user");
};

export default function Dailies() {
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
	const { data: session, status } = useSession();

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
		refreshInterval: 30000,
	});

	const [questsUnauth, setQuestsUnauth] = useState<Quest[] | null>(null);
	useEffect(() => {
		const fetcher = async () => {
			const response = await fetch("/api/quest");
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setQuestsUnauth(data);
			}
		};
		fetcher();
	}, []);

	let categories = [
		"Weekly Tasks and Trials",
		"Daily Tasks",
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
		"Cyrodiil Settlement Quests",
		"Miscellaneous",
	];

	if (!session) {
		return (
			<>
				<YourDailiesHeader></YourDailiesHeader>
				{status === "loading" && <LoadingSpinnerComponent text={"user"} />}
				{status === "unauthenticated" && (
					<>
						<Layout>
							<div className={`pb-4 pt-2 pl-4 pr-4  relative min-h-screen `}>
								<div className="flex flex-col lg:flex-row md:flex-row  justify-center"></div>
								<div className="content-center text-center ">
									<h2 className="text-white text-center pb-5 pt-5">{`Please sign in to view your own personalized checklist`}</h2>
									<Button
										className="w-40"
										type="primary"
										onClick={(e) => {
											signIn();
										}}
									>
										Sign In
									</Button>

									<h3 className="text-white text-center pb-5 pt-5">Possible Dailies Quests</h3>
								</div>
								{questsUnauth && (
									<div className="flex  sm:space-x-0 lg:space-x-5 md:space-x-3 flex-col  md:flex-row lg:flex-row justify-between relative">
										<div
											className={`w-full grid grid-cols-1  h-full lg:grid-cols-3 md:grid-cols-2 gap-3   auto-cols-1 md:ml-20 md:mr-20   `}
										>
											{/* Displaying Quests */}
											{categories.map((category) => (
												<UnauthQuestCategory
													key={category}
													quests={questsUnauth?.filter(function (el: any) {
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

	if (!data) return <LoadingSpinnerComponent text={"checklist"} />;

	return (
		<>
			<YourDailiesHeader></YourDailiesHeader>
			<YourDailiesChecklist user={data.user} lists={data.lists} quests={data.quests}></YourDailiesChecklist>
		</>
	);
}
