import { Button } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const LogoSection: React.FC<{ scrollToFunction: Function; numberOfQuestsCompleted?: number }> = ({
	scrollToFunction,
	numberOfQuestsCompleted = 512,
}) => {
	const { data: session, status } = useSession();

	//text-[#3478ff]
	return (
		<div className="  pt-3 px-3  backdrop-blur-md mb-20 mt-0 md:mt-20   border-b-2 border-solid border-l-0 border-r-0 border-t-0">
			<div className="text-6xl text-white text-center">
				<Image src="/logo3.png" layout="intrinsic" height={200} width={800} alt="logo"></Image>
			</div>
			<h2 className=" md:text-2xl text-center text-white pt-4 max-w-6xl m-auto ">
				Over <span className="text-[#3478ff]">{numberOfQuestsCompleted}</span> quests completed!
			</h2>
			<p className=" md:text-2xl text-center text-white pt-4 max-w-6xl m-auto">
				A simple and easy way for you to manage and keep track of the 100+ repeatable quests in the game. Simply
				login with your google account, create one or more characters, and visit your daily checklist. There you
				can see every single possible repeatable task and quest in the game. You can check off the ones you've
				done. Come back tomorrow and you'll find that all your dailies have been reset, so you can get started
				right away on your tasks!
			</p>
			<div className="content-center text-center text-white pt-2 flex flex-row justify-center space-x-4 ">
				<div className="text-white text-center pt-2">
					<Link className="text-white text-center pt-2" href="/yourdailies">
						<Button className="w-40" type="primary">
							Your Daily Checklist
						</Button>
					</Link>
				</div>
				<div className="text-white text-center   pt-2">
					<Button
						onClick={() => {
							scrollToFunction();
						}}
						className="w-40"
						type="default"
					>
						Learn more
					</Button>
				</div>
			</div>

			<div className="text-6xl text-white text-center translate-y-1 mt-8">
				<Image src="/example1.png" layout="intrinsic" height={400} width={1650 * 0.8} alt="logo"></Image>
			</div>
		</div>
	);
};

export default LogoSection;
