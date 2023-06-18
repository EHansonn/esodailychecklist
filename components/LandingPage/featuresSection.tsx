import { BulbOutlined, TeamOutlined, UnorderedListOutlined } from "@ant-design/icons";

const FeaturesSection = () => {
	return (
		<div className="relative  m-auto  pt-3 pb-4 px-3 rounded-lg backdrop-blur-md brightness-90 text-offwhite-50 w-9/10 lg:w-2/3 text-center">
			<h1 className="mt-0 mb-2 ">Features</h1>
			<div className="flex flex-col sm:flex-row text-left mx-8">
				<div className="flex flow-row ">
					<TeamOutlined className=" pt-1 pr-2" style={{ fontSize: "20px" }} />

					<p className="mt-0 mb-1 text-xl">
						Keep track of your own custom characters with their own check lists.
					</p>
				</div>
				<div className="flex flow-row ">
					<UnorderedListOutlined className=" pt-1 pr-2" style={{ fontSize: "20px" }} />
					<p className="mt-0 mb-1 text-xl">
						Create a custom list from the preset tasks to better focus on what you care about.
					</p>
				</div>
				<div className="flex flow-row ">
					<BulbOutlined className=" pt-1 pr-2" style={{ fontSize: "20px" }} />

					<p className="mt-0 mb-1 text-xl">Find information and links to the UESP for every single quest</p>
				</div>
			</div>
		</div>
	);
};

export default FeaturesSection;
