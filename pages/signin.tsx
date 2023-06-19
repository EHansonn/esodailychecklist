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
		query: { callbackUrl },
	} = useRouter();
	const id = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;
	let [newUser, setNewUser] = useState(false);

	useEffect(() => {
		setNewUser(localStorage.getItem("character") !== null ? true : false);
		console.log(newUser);
	}, []);

	return (
		<Layout>
			<div className="pb-4 pt-2 pl-4 pr-4  relative min-h-screen bg-black ">
				<div className="flex flex-col md:flex-row">
					<div className="flex justify-center flex-col text-center mt-2  w-1/2 m-auto p-20 rounded-lg">
						<h2 className="text-offwhite-50 pt-2">Welcome{newUser ? " back!" : "!"}</h2>

						<h3 className="text-offwhite-50">Sign In</h3>

						<div className="text-center flex flex-col ">
							<div className="flex justify-center">
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
							</div>
							{}
							<div className="flex justify-center ">
								<Button
									className="w-50 mb-4 flex justify-center "
									style={{
										background: "#7289DA",
										color: "White",
										
									}}
									type="primary"
									onClick={() => signIn("discord", { callbackUrl: id })}
								>
									<img
										className="-translate-x-2 w-full h-full"
										src={`${"https://authjs.dev/img/providers/discord-dark.svg"}`}
									></img>
									Sign in with Discord
								</Button>
							</div>
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
