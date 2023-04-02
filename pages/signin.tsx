import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { Button } from "antd";
import Icon from "@ant-design/icons";
import styles from "./signin.module.css";
import Image from "next/image";
export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	let {
		query: { callbackUrl },
	} = useRouter();
	const id = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;

	return (
		<Layout>
			<div className="pb-4 pt-2 pl-4 pr-4  relative min-h-screen bg-black ">
				<div className="flex flex-col md:flex-row">
					<div className="flex justify-center flex-col text-center mt-2  w-1/2 m-auto p-20 rounded-lg">
						<h3 className="text-offwhite-50">Sign In</h3>

						{Object.values(providers).map((provider) => (
							<div key={provider.name} className="justify-center flex">
								<Button
									className="w-50 mb-4 flex justify-center "
									style={{
										background: provider.name === "Discord" ? "#7289DA" : "#fff",
										borderColor: "",
										color: provider.name === "Discord" ? "White" : "black",
									}}
									type="primary"
									onClick={() => signIn(provider.id, { callbackUrl: id })}
								>
									<img
										className="-translate-x-2"
										src={`${
											provider.name === "Discord"
												? "https://authjs.dev/img/providers/discord-dark.svg"
												: "https://authjs.dev/img/providers/google.svg"
										}`}
									></img>
									Sign in with {provider.name}
								</Button>
							</div>
						))}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	// If the user is already logged in, redirect.
	// Note: Make sure not to redirect to the same page
	// To avoid an infinite loop!
	if (session) {
		return { redirect: { destination: "/" } };
	}

	const providers = await getProviders();

	return {
		props: { providers: providers ?? [] },
	};
}
