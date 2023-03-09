import React, { useState } from "react";
import { Character, Quest, User } from "../../pages/yourdailies";
import QuestRow from "../quests/QuestRow";
import Router from "next/router";
import styles from "../../pages/index.module.css";
import { Button, Drawer } from "antd";

const CharacterRow: React.FC<{ character: Character; user: User }> = ({
  character,
  user,
}) => {
  //console.log(character);
  //console.log(character);
  return (
    <div className={`flex flex-col object-contain text-black `}>
      <div className="flex flex-row">
        <div className="flex flex-row justify-between">{character.name}</div>
        <Button
          danger
          onClick={async () => {
            await fetch(`/api/character/${character.value}`, {
              method: "DELETE",
            });
            Router.push("/profile");
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CharacterRow;
