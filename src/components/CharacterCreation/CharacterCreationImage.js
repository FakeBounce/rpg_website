import React, { Component } from "react";
import PropTypes from "prop-types";
import FileUploader from "./FileUploader";

const styledCharacterImage = {
  width: "20%",
  height: window.innerHeight - 75 - 50 - 50, // minus header, validation button
  // and character name
  position: "relative",
  float: "left",
};

class CharacterCreationImage extends Component {
  render() {
    const { icon, onDrop, removePicture } = this.props;

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
  }
}

CharacterCreationImage.propTypes = {
  icon: PropTypes.oneOfType("string", "number", "object").isRequired,
  onDrop: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
};

export default CharacterCreationImage;
