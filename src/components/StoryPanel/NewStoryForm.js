import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";
import { mapNames } from "../Utils/Constants";
import FileUploader from "../CharacterCreation/FileUploader";
import SelectMapper from "../Utils/SelectMapper";
import firebase from "firebase";
import { connect } from "react-redux";
import { CALL_PRINT_ERROR } from "../../redux/actionsTypes/actionsTypesAppState";

const styledMapSelect = {
  position: "relative",
  display: "inline-block",
  marginTop: 15,
  width: 70,
  height: 19,
};

const NewStoryForm = props => {
  const [name, setName] = useState("");
  const [map, setMap] = useState("");
  const [icon, setIcon] = useState("");
  const [iconPath, setIconPath] = useState("");

  const onDrop = picture => {
    const { dispatchCallPrintError } = props;
    let storageRef = firebase.storage().ref();
    const path =
      "images/stories/" +
      firebase.auth().currentUser.uid +
      "_" +
      name +
      "." +
      picture[picture.length - 1].name.split(".")[1];
    storageRef
      .child(path)
      .put(picture[picture.length - 1])
      .then(() => {
        storageRef
          .child(path)
          .getDownloadURL()
          .then(url => {
            setIcon(url);
            setIconPath(path);
          })
          .catch(error => {
            // Handle any errors
            dispatchCallPrintError(error);
          });
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        dispatchCallPrintError(error);
      });
  };

  const removePicture = () => {
    const { dispatchCallPrintError } = props;
    // Delete the file
    let storageRef = firebase.storage().ref();
    storageRef
      .child(iconPath)
      .delete()
      .then(() => {
        // File deleted successfully
        setIcon("");
        setIconPath("");
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        dispatchCallPrintError(error);
      });
  };

  const { createStory } = props;
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
            setName(e.target.value);
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
          onChange={val => {
            setMap(val);
          }}
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

      {name !== "" && map !== "" && iconPath !== "" && (
        <ButtonLarge onClick={createStory} style={{ marginTop: 15 }}>
          Create story
        </ButtonLarge>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCallPrintError: payload => {
      dispatch({ type: CALL_PRINT_ERROR, payload });
    },
  };
};

NewStoryForm.propTypes = {
  createStory: PropTypes.func.isRequired,
  dispatchCallPrintError: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NewStoryForm);
