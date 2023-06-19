import React from "react";
import { Character, User } from "../DailyChecklist/dailiesCheckList";
import { DeleteOutlined } from "@ant-design/icons";
import { refreshData } from "../../pages/yourdailies";

const CharacterRow: React.FC<{
	character: Character;
	user: User;
	editMode: boolean;
	helperFunction: Function;
}> = ({ character, user, editMode, helperFunction }) => {
	return (
		<div className={`flex flex-row object-contain  text-offwhite-50 justify-between`}>
			<div className="flex-row flex w-max ">
				<div className=" ">{character.name}</div>
			</div>
			{editMode && (
				<DeleteOutlined
					className=" hover:bg-gray-700 transition ease-in-out delay-75 hover:scale-110 duration-100 rounded-lg"
					onClick={async () => {
						await fetch(`/api/character/${character.value}`, {
							method: "DELETE",
						});
						helperFunction(-1);
						refreshData();
					}}
				>
					Delete
				</DeleteOutlined>
			)}
		</div>
	);
};

export default CharacterRow;
