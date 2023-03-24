import React from "react";
import { Character, User } from "../DailyChecklist/dailieschecklist";
import { DeleteOutlined } from "@ant-design/icons";
import { refreshData } from "../../pages/yourdailies";

const CharacterRow: React.FC<{
	character: Character;
	user: User;
	editMode: boolean;
	helperFunction: Function;
}> = ({ character, user, editMode, helperFunction }) => {
	return (
		<div className={`flex flex-col object-contain  text-offwhite-50  `}>
			<div className="flex-row flex w-max ">
				{editMode && (
					<DeleteOutlined
						className="pt-1 hover:bg-gray-700 transition ease-in-out delay-75 hover:scale-110 duration-100"
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
				<div className=" ">{character.name}</div>
			</div>
		</div>
	);
};

export default CharacterRow;
