import React, { Component } from "react";
import PropTypes from "prop-types";
import Story from "./Story";
import ButtonLarge from "../Utils/ButtonLarge";
import { defaultStory, mapNames } from "../Utils/Constants";
import firebase from "firebase";
import { loadStories } from "../Utils/DatabaseFunctions";
import FileUploader from "../CharacterCreation/FileUploader";
import SelectMapper from "../Utils/SelectMapper";

const styledStoryPanel = {
  width: "100%",
  height: "100%",
  textAlign: "center",
};

const styledMapSelect = {
  position: "relative",
  display: "inline-block",
  marginTop: 15,
  width: 70,
  height: 19,
};

class StoriesPanel extends Component {
  state = {
    isCreatingStory: false,
    name: "",
    map: "",
    icon: "",
    iconPath: "",
  };

  onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  onSelectChange = name => value => {
    this.onChange(name, value);
  };

  toggleStoryCreation = bool => () => {
    this.setState(state => ({
      ...state,
      isCreatingStory: bool,
    }));
  };
  createStory = () => {
    const { stories, triggerError, chooseStory, doSetState } = this.props;
    const { name, map, iconPath } = this.state;

    const story = {
      ...defaultStory,
      name,
      map,
      gameMaster: firebase.auth().currentUser.uid,
      wallpaper: iconPath,
    };

    const lastStoryIndex = stories.length;

    firebase
      .database()
      .ref("stories/" + lastStoryIndex)
      .set(story)
      .then(() => {
        loadStories(doSetState, () => {
          chooseStory(lastStoryIndex);
        });
        this.setState(state => ({
          ...state,
          isCreatingStory: false,
          name: "",
          map: "",
        }));
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  removePicture = () => {
    const { triggerError } = this.props;
    const { iconPath } = this.state;
    // Delete the file
    let storageRef = firebase.storage().ref();
    storageRef
      .child(iconPath)
      .delete()
      .then(() => {
        // File deleted successfully
        this.setState(state => ({
          ...state,
          icon: "",
          iconPath: "",
        }));
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        triggerError(error);
      });
  };

  onDrop = picture => {
    const { triggerError } = this.props;
    const { name } = this.state;
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
            this.setState({
              icon: url,
              iconPath: path,
            });
          })
          .catch(error => {
            // Handle any errors
            triggerError(error);
          });
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        triggerError(error);
      });
  };

  render() {
    const { stories, chooseStory, signOut, triggerError } = this.props;
    const { isCreatingStory, name, map, icon, iconPath } = this.state;
    if (isCreatingStory) {
      return (
        <div style={styledStoryPanel}>
          <ButtonLarge onClick={this.toggleStoryCreation(false)}>
            Cancel story creation
          </ButtonLarge>

          <div
            style={{
              marginTop: 30,
              width: "25%",
              height: "50%",
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            <div
              style={{ width: "100%", display: "block", position: "relative" }}
            >
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
                {icon === "" && <FileUploader onDrop={this.onDrop} />}
                {icon !== "" && (
                  <div>
                    <img
                      src={icon}
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                      alt={`${name}`}
                    />
                    <button onClick={this.removePicture}>Remove picture</button>
                  </div>
                )}
              </div>
            )}

            {name !== "" &&
              map !== "" &&
              iconPath !== "" && (
                <ButtonLarge
                  onClick={this.createStory}
                  style={{ marginTop: 15 }}
                >
                  Create story
                </ButtonLarge>
              )}
          </div>
        </div>
      );
    }
    return (
      <div style={styledStoryPanel}>
        Select a story :
        <ButtonLarge
          onClick={signOut}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          Log out
        </ButtonLarge>
        <div>
          {stories.map((s, index) => {
            return (
              <Story
                key={`${s.name}-${index}`}
                chooseStory={chooseStory}
                index={index}
                name={s.name}
                wallpaper={s.wallpaper}
                totalStories={stories.length}
                triggerError={triggerError}
              />
            );
          })}
        </div>
        <ButtonLarge onClick={this.toggleStoryCreation(true)}>
          Create a story
        </ButtonLarge>
      </div>
    );
  }
}

StoriesPanel.propTypes = {
  stories: PropTypes.array.isRequired,
  chooseStory: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default StoriesPanel;
