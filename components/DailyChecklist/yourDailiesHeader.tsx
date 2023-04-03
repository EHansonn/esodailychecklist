import Head from "next/head";

const YourDailiesHeader = () => {
	return (
		<Head>
			<title>Your Tasks - ESO Daily Checklist</title>
			<meta
				name="description"
				content="Keep track of the 100+ repeatable quests in the Elder Scrolls Online. Simply login with your google account, create one or more characters, and visit your daily checklist. There you can see every single possible repeatable task and quest in the game. You can check off the ones you've done. Come back tomorrow and you'll find that all your dailies have been reset, so you can get started right away on your tasks!"
			/>
			<meta
				name="viewport"
				content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
			></meta>
			<link rel="icon" href="/favicon.ico"></link>
		</Head>
	);
};

export default YourDailiesHeader;
