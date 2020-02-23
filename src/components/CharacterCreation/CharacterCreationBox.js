import React from "react";
import CharacterCreationImage from "./CharacterCreationImage";
import CharacterCreationStats from "./CharacterCreationStats";

const styledCharacterBox = {
  height: window.innerHeight - 75 - 50, // minus header and validation button
};

const CharacterCreationBox = () => {
  return (
    <div style={styledCharacterBox}>
      <CharacterCreationImage />
      <CharacterCreationStats />
    </div>
  );
};

export default CharacterCreationBox;
