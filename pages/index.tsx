import { useRef } from "react";
import AboutSection from "../components/LandingPage/aboutSection";
import FeaturesSection from "../components/LandingPage/featuresSection";
import LogoSection from "../components/LandingPage/logoSection";
import Layout from "../components/layout";

export default function IndexPage() {
	//const { data: session, status } = useSession();
	const aboutRef = useRef<HTMLDivElement>(null);
	const scrollToAbout = () => {
		aboutRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			<Layout>
				<div className={`pb-4 pt-2 pl-4 pr-4  relative min-h-screen bg-black`}>
					<div className="flex flex-col ">
						<LogoSection scrollToFunction={scrollToAbout}></LogoSection>
						<FeaturesSection></FeaturesSection>
						<AboutSection innerRef={aboutRef}></AboutSection>
					</div>
					<div className="absolute bottom-0 left-0 inset-x-0 items-center justify-center text-center rounded-lg backdrop-blur-xl bg-white/50 "></div>{" "}
					<div className="flex flex-col space-y-3 lg:w-1/3 md:w-1/3 sm:w-full lg:mt-0 md:mt-0 mt-4  whitespace-nowrap overflow-hidden "></div>
				</div>
			</Layout>
		</>
	);
}
