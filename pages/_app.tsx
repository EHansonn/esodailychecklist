import { SessionProvider } from "next-auth/react";
import "../styles/./styles.css";
import "../styles/./globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { useEffect } from "react";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Head from "next/head";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
	useEffect(() => {
		NProgress.configure({ showSpinner: false });
		Router.events.on("routeChangeStart", NProgress.start);
		Router.events.on("routeChangeComplete", NProgress.done);
		Router.events.on("routeChangeError", NProgress.done);
		return () => {
			Router.events.off("routeChangeStart", NProgress.start);
			Router.events.off("routeChangeComplete", NProgress.done);
			Router.events.off("routeChangeError", NProgress.done);
		};
	}, []);
	return (
		<SessionProvider session={session}>
			<Head>
				<title>ESO Daily Checklist</title>
				<meta
					name="description"
					content="Keep track of the 100+ repeatable quests in the Elder Scrolls Online. Simply login with your google account, create one or more characters, and visit your daily checklist. There you can see every single possible repeatable task and quest in the game. You can check off the ones you've done. Come back tomorrow and you'll find that all your dailies have been reset, so you can get started right away on your tasks!"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico"></link>
			</Head>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
