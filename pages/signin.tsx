import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { Button } from "antd";
import Icon from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function SignIn() {
	let {
		query: { callbackUrl, error },
	} = useRouter();
	const id = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;
	let [newUser, setNewUser] = useState(false);
	const displayError = error
		? error === "OAuthAccountNotLinked"
			? "An account is already associated with this email address. Try the other provider"
			: error
		: "";
	useEffect(() => {
		setNewUser(localStorage.getItem("character") !== null ? true : false);
	}, []);

	return (
		<Layout>
			<div className="pb-4 pt-2 pl-4 pr-4  relative min-h-screen bg-neargrey-50 ">
				<div className="flex flex-col md:flex-row">
					<div className="flex justify-center flex-col text-center mt-2   m-auto md:p-20 rounded-lg">
						<h2 className="text-offwhite-50 pt-2">Welcome{newUser ? " back!" : "!"}</h2>

						<h3 className="text-offwhite-50">Sign In</h3>

						<div className="text-center flex flex-col ">
							{/* <div className="flex justify-center">
								<Button
									className="w-50 mb-4 flex justify-center "
									style={{
										background: "#fff",
										color: "black",
									}}
									type="primary"
									onClick={() => signIn("google", { callbackUrl: id })}
								>
									<img
										className="-translate-x-2 w-full h-full"
										src={`${"https://authjs.dev/img/providers/google.svg"}`}
									></img>
									Sign in with Google
								</Button>
							</div> */}
							<div className="flex justify-center ">
								<div id="google-button" onClick={() => signIn("google", { callbackUrl: id })}>
									<div className="bg-login-button">
										<div className="icon">
											<img
												className=""
												src={`${"https://authjs.dev/img/providers/google.svg"}`}
											></img>
										</div>
										<span>Sign in with Google</span>
									</div>
								</div>
							</div>
							<div className="flex justify-center ">
								<div id="discord-button" onClick={() => signIn("discord", { callbackUrl: id })}>
									<div className="bg-login-button">
										<div className="icon">
											<svg
												width={34}
												height={34}
												id="Layer_1"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 256 293"
												className=""
											>
												<path
													xmlns="http://www.w3.org/2000/svg"
													d="M226.011 0H29.99C13.459 0 0 13.458 0 30.135v197.778c0 16.677 13.458 30.135 29.989 30.135h165.888l-7.754-27.063 18.725 17.408 17.7 16.384L256 292.571V30.135C256 13.458 242.542 0 226.011 0zm-56.466 191.05s-5.266-6.291-9.655-11.85c19.164-5.413 26.478-17.408 26.478-17.408-5.998 3.95-11.703 6.73-16.823 8.63-7.314 3.073-14.336 5.12-21.211 6.291-14.044 2.633-26.917 1.902-37.888-.146-8.339-1.61-15.507-3.95-21.504-6.29-3.365-1.317-7.022-2.926-10.68-4.974-.438-.293-.877-.439-1.316-.732-.292-.146-.439-.292-.585-.438-2.633-1.463-4.096-2.487-4.096-2.487s7.022 11.703 25.6 17.261c-4.388 5.56-9.801 12.142-9.801 12.142-32.33-1.024-44.617-22.235-44.617-22.235 0-47.104 21.065-85.285 21.065-85.285 21.065-15.799 41.106-15.36 41.106-15.36l1.463 1.756C80.75 77.53 68.608 89.088 68.608 89.088s3.218-1.755 8.63-4.242c15.653-6.876 28.088-8.777 33.208-9.216.877-.147 1.609-.293 2.487-.293a123.776 123.776 0 0 1 29.55-.292c13.896 1.609 28.818 5.705 44.031 14.043 0 0-11.556-10.971-36.425-18.578l2.048-2.34s20.041-.44 41.106 15.36c0 0 21.066 38.18 21.066 85.284 0 0-12.435 21.211-44.764 22.235zm-68.023-68.316c-8.338 0-14.92 7.314-14.92 16.237 0 8.924 6.728 16.238 14.92 16.238 8.339 0 14.921-7.314 14.921-16.238.147-8.923-6.582-16.237-14.92-16.237m53.394 0c-8.339 0-14.922 7.314-14.922 16.237 0 8.924 6.73 16.238 14.922 16.238 8.338 0 14.92-7.314 14.92-16.238 0-8.923-6.582-16.237-14.92-16.237"
													fill="#fff"
												/>
											</svg>
										</div>
										<span>Sign in with Discord</span>
									</div>
								</div>
							</div>
							{displayError && <div className="text-red-500">{displayError}</div>}
						</div>
					</div>
					<div className="text-center mt-2  border-b-0 border-t-0 border-offwhite-100 border-solid border-l-4 border-r-0  w-1/2 min-h-screen m-auto p-20 hidden md:flex flex-col ">
						<h3 className="text-offwhite-50"></h3>
						<div className="text-6xl text-white text-center">
							<Image src="/logo3.png" layout="intrinsic" height={200} width={800} alt="logo"></Image>
						</div>
						<div className="text-6xl text-white text-center translate-y-1 mt-8 border-b-2 border-solid border-t-0 border-l-0 border-r-0 ">
							<Image src="/example1.png" layout="intrinsic" height={400} width={1650} alt="logo"></Image>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
