import React from "react";
import FileUploader from "./FileUploader";
import { useCharacterContext } from "../../contexts/characterContext";

const styledCharacterImage = {
  width: "20%",
  height: window.innerHeight - 75 - 50 - 50, // minus header, validation button
  // and character name
  position: "relative",
  float: "left",
};

const CharacterCreationImage = () => {
  const { icon, onDrop, removePicture } = useCharacterContext();

  return (
    <div style={styledCharacterImage}>
      {icon === "" && <FileUploader onDrop={onDrop} />}
      {icon !== "" && (
        <div>
          <img
            src={icon}
            style={{ maxWidth: "50px", maxHeight: "50px" }}
            alt={"Character preview"}
          />
          <button onClick={removePicture}>Remove picture</button>
        </div>
      )}
    </div>
  );
};

export default CharacterCreationImage;
