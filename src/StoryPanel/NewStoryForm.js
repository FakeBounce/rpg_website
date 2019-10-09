import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";
import { mapNames } from "../Utils/Constants";
import FileUploader from "../CharacterCreation/FileUploader";
import SelectMapper from "../Utils/SelectMapper";

const styledMapSelect = {
  position: "relative",
  display: "inline-block",
  marginTop: 15,
  width: 70,
  height: 19,
};

class NewStoryForm extends Component {
  onSelectChange = name => value => {
    const { onChange } = this.props;
    onChange(name, value);
  };

  render() {
    const {
      name,
      map,
      icon,
      iconPath,
      createStory,
      onDrop,
      removePicture,
    } = this.props;
    return (
      <div
        style={{
          marginTop: 30,
          width: "25%",
          height: "50%",
          border: "1px solid black",
          textAlign: "center",
        }}
      >
        <div style={{ width: "100%", display: "block", position: "relative" }}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={e => {
              this.onChange(e.target.name, e.target.value);
            }}
            style={{ width: "80%", marginTop: 15 }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "block",
            position: "relative",
            textAlign: "center",
          }}
        >
          <SelectMapper
            value={map}
            onChange={this.onSelectChange("map")}
            mapArray={mapNames}
            style={styledMapSelect}
          />
        </div>
        {name !== "" && (
          <div
            style={{
              width: "100%",
              display: "block",
              position: "relative",
              textAlign: "center",
            }}
          >
            {icon === "" && <FileUploader onDrop={onDrop} />}
            {icon !== "" && (
              <div>
                <img
                  src={icon}
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                  alt={`${name}`}
                />
                <button onClick={removePicture}>Remove picture</button>
              </div>
            )}
          </div>
        )}

        {name !== "" &&
          map !== "" &&
          iconPath !== "" && (
            <ButtonLarge onClick={createStory} style={{ marginTop: 15 }}>
              Create story
            </ButtonLarge>
          )}
      </div>
    );
  }
}

NewStoryForm.propTypes = {
  name: PropTypes.string.isRequired,
  map: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  createStory: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
};

export default NewStoryForm;
