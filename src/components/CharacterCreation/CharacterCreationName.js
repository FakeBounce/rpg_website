import React from "react";
import { useCharacterContext } from "../../contexts/characterContext";

const CharacterCreationName = () => {
  const { name, setName } = useCharacterContext();

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
    </div>
  );
};

export default CharacterCreationName;
