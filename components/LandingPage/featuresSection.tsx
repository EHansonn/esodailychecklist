import { BulbOutlined, TeamOutlined, UnorderedListOutlined } from "@ant-design/icons";

const FeaturesSection = () => {
	return (
		<div className="relative  m-auto  pt-3 pb-4 px-3 rounded-lg backdrop-blur-md  bg-slate-800 brightness-90 text-offwhite-50 w-1/2 text-center">
			<h1 className="mt-0 mb-2 ">Features</h1>
			<div className="flex flex-col sm:flex-row ">
				<p className="mt-0 mb-1 text-xl">
					<TeamOutlined style={{ fontSize: "20px" }} />
					Keep track of your own custom characters with their own check lists.
				</p>
				<p className="mt-0 mb-1 text-xl">
					<UnorderedListOutlined style={{ fontSize: "20px" }} /> Create a custom list from the preset tasks to
					better focus on what you care about.
				</p>
				<p className="mt-0 mb-1 text-xl">
					<BulbOutlined style={{ fontSize: "20px" }} />
					Find information and links to the UESP for every single quest
				</p>
			</div>
		</div>
	);
};

export default FeaturesSection;