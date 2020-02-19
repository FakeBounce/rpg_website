import React, { useState } from "react";
import CharacterCreationItems from "./CharacterCreationItems";
import CharacterCreationAbilites from "./CharacterCreationAbilites";
import CharacterCreationWeapons from "./CharacterCreationWeapons";
import CharacterCreationSkills from "./CharacterCreationSkills";
import CharacterCreationAttributes from "./CharacterCreationAttributes";
import CharacterCreationDescription from "./CharacterCreationDescription";
import CharacterCreationStatsTabs from "./CharacterCreationStatsTabs";

const styledCharacterStats = {
  width: "80%",
  height: window.innerHeight - 75 - 50 - 50, // minus header, validation button
  // and character name
  position: "relative",
  float: "left",
};

const CharacterCreationStats = () => {
  const [currentPanel, setCurrentPanel] = useState("attributes");

  return (
    <div style={styledCharacterStats}>
      <CharacterCreationStatsTabs
        currentPanel={currentPanel}
        changePanel={setCurrentPanel}
      />
      {currentPanel === "attributes" && (
        <>
          <CharacterCreationAttributes />
          <CharacterCreationDescription />
        </>
      )}
      {currentPanel === "skills" && (
        <>
          <CharacterCreationSkills />
          <CharacterCreationAbilites />
        </>
      )}
      {currentPanel === "items" && (
        <>
          <CharacterCreationWeapons />
          <CharacterCreationItems />
        </>
      )}
    </div>
  );
};

export default CharacterCreationStats;
