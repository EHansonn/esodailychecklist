import { MutableRefObject } from "react";

const AboutSection: React.FC<{
	innerRef: MutableRefObject<null | HTMLDivElement>;
}> = ({ innerRef }) => {
	return (
		<div ref={innerRef} className=" pt-20 pb-20">
			<div className="relative  m-auto  pt-1 pb-4 px-3 rounded-lg backdrop-blur-md   text-offwhite-50 w-9/10 md:w-1/2 text-center">
				<h1 className="mt-0 mb-2 pb-0 pt-2">About Us</h1>
				<div className="flex flex-col sm:flex-row ">
					<p className="text-xl text-center text-white  max-w-6xl m-auto text-left">
						ESO Daily Checklist is a small ToDo app created by a former ESO player who understands how hard
						keeping track of your dailies can be. While in-game addons can provide similar functionality,
						the online, cross-platoform nature of a web app allows you to more easily manage your dailies
						across multiple devices.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutSection;
