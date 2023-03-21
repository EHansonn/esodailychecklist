import React, { useState } from "react";
import { Character, Quest, User } from "../dailieschecklist";
import QuestRow from "../quests/QuestRow";
import Router from "next/router";
import styles from "../../pages/index.module.css";
import { Button, Drawer } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CharacterRow: React.FC<{
  character: Character;
  user: User;
  editMode: boolean;
  helperFunction: Function;
}> = ({ character, user, editMode, helperFunction }) => {
  //console.log(character);
  //console.log(character);
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
              Router.push("/profile");
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
