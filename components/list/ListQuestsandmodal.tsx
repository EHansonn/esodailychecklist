import React, { useState } from "react";
import Link from "next/link";
import { Drawer } from "antd";
import { Quest, User } from "../DailyChecklist/dailiesCheckList";

import styles from "../../pages/index.module.css";
import { CloseOutlined } from "@ant-design/icons";
const ListQuestAndRow: React.FC<{ quest: Quest }> = ({ quest }) => {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div
				key={`${quest.value} 123`}
				className={`flex flex-row my-1 pl-0 justify-between cursor-pointer  hover:bg-slate-600 ${styles.font} `}
			>
				<div className="flex justify-start"></div>

				<div className="flex-1 flex-row flex justify-between" onClick={showDrawer}>
					<h4 className="pl-2 m-0 ">{quest.optionalTitle ? quest.optionalTitle : quest?.value}</h4>
					<div className="pl-2 m-0 pr-5 ">
						<div>{quest.repeatable}</div>
					</div>
				</div>
			</div>
			<Drawer
				closeIcon={<CloseOutlined style={{ color: "white" }}></CloseOutlined>}
				style={{ backgroundColor: "#1e293b" }}
				className="text-offwhite-50"
				title={
					<label style={{ color: "White" }}>{quest.optionalTitle ? quest.optionalTitle : quest?.value}</label>
				}
				placement="left"
				onClose={onClose}
				open={open}
			>
				{quest.optionalTitle && <div className="pb-2">Quest Name: {quest?.value}</div>}
				<div className="pb-2">Category: {quest?.category}</div>
				{quest?.description && <div className="pb-2">{quest?.description}</div>}
				<div className="pb-2">Repeatable: {quest?.repeatable}</div>
				{quest?.location && <div className="pb-2">Location: {quest?.location}</div>}
				{quest?.questGiver && <div className="pb-2">Quest Giver: {quest?.questGiver}</div>}
				{quest?.reward && <div className="pb-2">Reward: {quest?.reward}</div>}
				{quest?.uespLink && <Link href={`${quest?.uespLink}`}>{quest?.uespLink}</Link>}
			</Drawer>
		</>
	);
};

export default ListQuestAndRow;
