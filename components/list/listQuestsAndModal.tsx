import React, { useState } from "react";
import Link from "next/link";
import { Drawer } from "antd";
import { Quest } from "../DailyChecklist/dailiesCheckList";

import { CloseOutlined } from "@ant-design/icons";
const ListQuestAndRow: React.FC<{ quest: Quest; showDrawer: Function }> = ({ quest, showDrawer }) => {
	return (
		<>
			<div
				key={`${quest.value} 123`}
				className={`flex flex-row my-1 pl-0 justify-between cursor-pointer  hover:bg-slate-600  text-offwhite-50`}
			>
				<div className="flex justify-start"></div>

				<div
					className="flex-1 flex-row flex justify-between"
					onClick={() => {
						showDrawer(
							quest?.category || "",
							quest?.description || "",
							quest?.repeatable || "",
							quest?.location || "",
							quest?.questGiver || "",
							quest?.reward || "",
							quest?.uespLink || "",
							quest.optionalTitle ? quest.optionalTitle : quest?.value,
							"left",
						);
					}}
				>
					<h4 className="pl-2 m-0 ">{quest.optionalTitle ? quest.optionalTitle : quest?.value}</h4>
					<div className="pl-2 m-0 pr-5 ">
						<div>{quest.repeatable}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ListQuestAndRow;
