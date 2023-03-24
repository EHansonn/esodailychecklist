import { useSession } from "next-auth/react";
import YourDailiesHeader from "../components/DailyChecklist/yourDailiesHeader";
import YourDailiesChecklist from "../components/DailyChecklist/dailiesCheckList";
import { LoadingOutlined } from "@ant-design/icons";
import useSWR, { mutate } from "swr";
import LoadingSpinnerComponent from "../components/loading/loadingSpinner";
import SignInComponent from "../components/authButtons/signInComponent";
import LoadingError from "../components/loading/loadingError";

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

	if (!session) {
		return (
			<>
				<YourDailiesHeader></YourDailiesHeader>
				{status === "loading" && <LoadingSpinnerComponent text={"user"} />}
				{status === "unauthenticated" && <SignInComponent text={"checklist"} />}
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
