import { useSession } from "next-auth/react";
import Head from "next/head";
import ProfileInfo from "../components/profile/profileInfo";
import useSWR, { mutate } from "swr";
import SignInComponent from "../components/authButtons/signInComponent";
import LoadingSpinnerComponent from "../components/loading/loadingSpinner";
import LoadingError from "../components/loading/loadingError";
export default function Dailies() {
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
		refreshInterval: 60000,
	});
	//refreshed using refresh function from yourdailies.

	if (!session) {
		return (
			<>
				<Head>
					<title>Please Sign In</title>
					<meta name="ESO Daily Checklist - ESO ToDO List" content="" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico"></link>
				</Head>
				{status === "loading" && <LoadingSpinnerComponent text={"user"} />}
				{status === "unauthenticated" && <SignInComponent text={"profile"} />}
			</>
		);
	}

	if (error) return <LoadingError text={"profile"} />;

	if (!data) return <LoadingSpinnerComponent text={"profile"} />;

	return (
		<>
			<Head>
				<title>Your Profile - ESO Daily Checklist</title>
				<meta
					name="description"
					content="Keep track of the 100+ repeatable quests in the Elder Scrolls Online. Simply login with your google account, create one or more characters, and visit your daily checklist. There you can see every single possible repeatable task and quest in the game. You can check off the ones you've done. Come back tomorrow and you'll find that all your dailies have been reset, so you can get started right away on your tasks!"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<ProfileInfo user={data.user} lists={data.lists} quests={data.quests}></ProfileInfo>
		</>
	);
}
