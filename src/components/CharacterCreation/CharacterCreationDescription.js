import React from "react";
import { useCharacterContext } from "../../contexts/characterContext";

const CharacterCreationDescription = () => {
  const { description, setDescription } = useCharacterContext;

  return (
    <div>
      <textarea
        name="description"
        placeholder="description"
        value={description}
        onChange={e => {
          setDescription(e.target.name, e.target.value);
        }}
      />
    </div>
  );
};

export default CharacterCreationDescription;
