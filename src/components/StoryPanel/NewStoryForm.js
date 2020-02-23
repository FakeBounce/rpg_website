import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";
import { mapNames } from "../Utils/Constants";
import FileUploader from "../CharacterCreation/FileUploader";
import SelectMapper from "../Utils/SelectMapper";
import firebase from "firebase";
import { connect } from "react-redux";
import { CALL_PRINT_ERROR } from "../../redux/actionsTypes/actionsTypesAppState";
import { Button } from "semantic-ui-react";
import { cursorPointer } from "../Utils/StyleConstants";

const styledMapSelect = {
  position: "relative",
  display: "inline-block",
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
    <>
      <div
        style={{
          marginTop: 30,
          width: "50%",
          height: "50%",
          border: "1px solid white",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div style={{ width: "100%", display: "block", position: "relative" }}>
          <input
            type="text"
            name="name"
            placeholder="Story name"
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
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          Choose a map to start with :
          <SelectMapper
            value={map}
            onChange={val => {
              setMap(val);
            }}
            mapArray={mapNames}
            style={styledMapSelect}
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
          {icon === "" && (
            <FileUploader
              onDrop={onDrop}
              fileContainerStyle={{ backgroundColor: "#2c3e50" }}
              buttonStyles={{ cursor: cursorPointer }}
            />
          )}
          {icon !== "" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={icon}
                style={{
                  maxWidth: 200,
                  maxHeight: 200,
                  borderRadius: 100,
                }}
                alt={`${name}`}
              />
              <Button
                secondary
                onClick={removePicture}
                style={{ cursor: cursorPointer }}
              >
                Remove picture
              </Button>
            </div>
          )}
        </div>
      </div>

      {name !== "" && map !== "" && iconPath !== "" && (
        <ButtonLarge onClick={createStory} style={{ marginTop: 20 }}>
          Create story
        </ButtonLarge>
      )}
    </>
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
