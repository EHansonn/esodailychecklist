import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Checkbox, ConfigProvider, Drawer } from "antd";
import { Character, Quest, User } from "../DailyChecklist/dailiesCheckList";
import { CloseOutlined } from "@ant-design/icons";
export type questProps = {
	quest: Quest;
};

export type charChecked = {
	boolVal: boolean;
	character: Character;
};

export type allChecked = [charChecked: charChecked];

const UnauthQuestRow: React.FC<{
	quest: Quest;
}> = ({ quest }) => {
	return (
		<>
			<div className={`flex flex-row my-2 pl-2 justify-between `}>
				<div className="flex justify-start"></div>

				<div className="flex-1 flex-row flex justify-between">
					<h3 className={`pl-2 m-0 `}>{quest.optionalTitle ? quest.optionalTitle : quest?.value}</h3>
					<div className={`pl-2 m-0 pr-5 text-base   `}>
						{/* <div className={`${styles.font}`}>{quest.repeatable}</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default UnauthQuestRow;
