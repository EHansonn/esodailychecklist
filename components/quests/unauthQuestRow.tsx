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
	//Antd Drawer stuff.
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className={`flex flex-row my-2 pl-2 justify-between hover:bg-slate-600 cursor-pointer`}>
				<div className="flex justify-start"></div>

				<div className="flex-1 flex-row flex justify-between" onClick={showDrawer}>
					<h3 className={`pl-2 m-0 select-none`}>
						{quest.optionalTitle ? quest.optionalTitle : quest?.value}
					</h3>
					<div className={`pl-2 m-0 pr-5 text-base   `}>
						{/* <div className={`${styles.font}`}>{quest.repeatable}</div> */}
					</div>
				</div>
			</div>
			<Drawer
				style={{ backgroundColor: "#1e293b" }}
				closeIcon={<CloseOutlined style={{ color: "white" }}></CloseOutlined>}
				className="text-offwhite-50 fill-white"
				title={
					<label style={{ color: "White" }}>{quest.optionalTitle ? quest.optionalTitle : quest?.value}</label>
				}
				placement="right"
				onClose={onClose}
				open={open}
			>
				<div className="pb-2">Category: {quest?.category}</div>
				{quest?.description && <div className="pb-2">{quest?.description}</div>}
				<div className="pb-2 ">Repeatable: {quest?.repeatable}</div>
				{quest?.location && <div className="pb-2">Location: {quest?.location}</div>}
				{quest?.questGiver && <div className="pb-2">Quest Giver: {quest?.questGiver}</div>}
				{quest?.reward && <div className="pb-2">Reward: {quest?.reward}</div>}
				{quest?.uespLink && (
					<Link className="" href={`${quest?.uespLink}`}>
						{quest?.uespLink}
					</Link>
				)}
			</Drawer>
		</>
	);
};

export default UnauthQuestRow;
