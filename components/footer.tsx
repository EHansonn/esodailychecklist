import Link from "next/link";
import { GithubOutlined } from "@ant-design/icons";

export default function Footer() {
	return (
		<div className=" bg-slate-800 text-offwhite-50 text-center flex flex-col justify-center">
			<div className=" bg-slate-800 text-offwhite-50 text-center  flex justify-center">
				<div className="flex-row flex pt-5 pb-5 relative">
					<div className="flex flex-col">
						<small>ESO Daily Checklist</small>
						<small>Made by EHansonn</small>
					</div>
					<div className="align-middle h-full  content-center flex pt-1 pl-2  ">
						<Link style={{ textDecoration: "none" }} href={"https://github.com/EHansonn/esodailychecklist"}>
							<GithubOutlined className="teamSocialIcon text-3xl text-white" />
						</Link>
					</div>
				</div>
			</div>
			<small className="text-xs ">
				The Elder Scrolls Online, and all ESO related logos and images are registered trademarks of ZeniMax
				Media.
			</small>
			<small className="text-xs pb-2">
				ESO Daily Checklist is in no way related to Bethesda Softworks, ZeniMax Online Studios, or its parent
				company ZeniMax Media.
			</small>
		</div>
	);
}

/*

<small className="text-xs">
						ESO Daily Checklist is neither directly nor indirectly related to Bethesda Softworks, ZeniMax
						Online Studios, nor parent company ZeniMax Media, in any way, shape, or form.
					</small>
					<small className="text-xs">
						The Elder Scrolls® Online developed by ZeniMax Online Studios LLC, a ZeniMax Media company.
						ZeniMax, The Elder Scrolls, ESO, Bethesda, Bethesda Softworks and related logos are registered
						trademarks or trademarks of ZeniMax Media Inc. in the US and/or other countries. All Rights
						Reserved.
					</small>

*/
