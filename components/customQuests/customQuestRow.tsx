import React from "react";
import { Character, Quest, User } from "../DailyChecklist/dailiesCheckList";
import { DeleteOutlined } from "@ant-design/icons";
import { refreshData } from "../../pages/yourdailies";

const CustomQuestRow: React.FC<{
	quest: Quest;
	editMode: boolean;
}> = ({ quest, editMode }) => {
	return (
		<div className={`flex flex-col object-contain  text-offwhite-50  `}>
			<div className="flex-row flex w-max ">
				{editMode && (
					<DeleteOutlined
						className="pt-1 hover:bg-gray-700 transition ease-in-out delay-75 hover:scale-110 duration-100"
						onClick={async () => {
							await fetch(`/api/quest/${quest.value}`, {
								method: "DELETE",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({
									optionalTitle: quest?.optionalTitle,
								}),
							});
							refreshData();
						}}
					>
						Delete
					</DeleteOutlined>
				)}
				<div className=" ">{quest?.optionalTitle}</div>
			</div>
		</div>
	);
};

export default CustomQuestRow;
