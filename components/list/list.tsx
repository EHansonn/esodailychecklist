import React, { useState } from "react";
import { Quest } from "../DailyChecklist/dailiesCheckList";
import ListQuestAndRow from "./listQuestsAndModal";
import { CloseOutlined, DownOutlined } from "@ant-design/icons";
import { refreshData } from "../../pages/yourdailies";
export type ListProps = {
	tasks: Quest[] | undefined;
	id: string;
	title: string;
	owner: {
		name: string;
		email: string;
	} | null;
	content: string | null;
	userId: string;
};

//Old questprops
export type QuestProps = {
	value: string;
	category: string;
	optionTitle: string | null;
	description: string | null;
	repeatable: string;
	location: string | null;
	questGiver: string | null;
	uespLink: string | null;
	reward: string | null;
};

const List: React.FC<{
	list: ListProps;
}> = ({ list }) => {
	const [active, setActive] = useState(false);
	const [deleteTransition, setDeleteTransition] = useState(false);
	const showDetails = () => {
		setActive((currVal) => {
			return !currVal;
		});
	};

	return (
		<div
			className={`bg-offwhite-200  border-solid border-2 border-offwhite-50   justify-between   flex-row object-contain rounded-lg py-2 pl-2 pr-2
    transition-opacity duration-100 ease-out  ${deleteTransition ? "opacity-0" : "opacity-100"}`}
		>
			<div className={`flex flex-col object-contain text-offwhite-50 `}>
				<div className="flex justify-between w-full cursor-pointer ">
					<div
						className="  flex flex-row justify-between w-full hover:bg-slate-600 rounded-md "
						onClick={showDetails}
					>
						<h3 className="mt-0 pl-1 pt-0 mb-0 inline-block align-baseline select-none">{list.title}</h3>
						<div>
							<DownOutlined
								className={`mt-1 mr-1 hover:bg-slate-600 cursor-pointer h-[16px] w-[16px] transition-all duration-100 ${
									active ? "rotate-0" : "rotate-180"
								}`}
							/>
						</div>
					</div>

					<CloseOutlined
						className="mt-1 ml-1 hover:bg-slate-600 cursor-pointer h-[16px] w-[16px]"
						onClick={async () => {
							setDeleteTransition(true);
							await fetch(`/api/list/${list.id}`, {
								method: "DELETE",
							});
							refreshData();
						}}
						style={{ color: "white" }}
					></CloseOutlined>
				</div>

				<div className={`${active ? "" : "hidden"}`}>
					<h4 className="mt-0 mb-2">{list.content}</h4>
					<h4 className="mt-0 mb-0">Selected Quests:</h4>
					<div className="flex flex-col ">
						{list?.tasks!.map((quest: Quest) => {
							return <ListQuestAndRow key={quest.value} quest={quest}></ListQuestAndRow>;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default List;
