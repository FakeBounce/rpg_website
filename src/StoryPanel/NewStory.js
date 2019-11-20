import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";
import { defaultStory } from "../Utils/Constants";
import firebase from "firebase";
import { loadStories } from "../Utils/DatabaseFunctions";
import NewStoryForm from "./NewStoryForm";

const styledStoryPanel = {
  width: "100%",
  height: "100%",
  textAlign: "center",
};

class NewStory extends Component {
  state = {
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
    const { name, map, icon, iconPath } = this.state;
    const { toggleStoryCreation } = this.props;

    return (
      <div style={styledStoryPanel}>
        <ButtonLarge onClick={toggleStoryCreation(false)}>
          Cancel story creation
        </ButtonLarge>

        <NewStoryForm
          name={name}
          map={map}
          icon={icon}
          iconPath={iconPath}
          onDrop={this.onDrop}
          onChange={this.onChange}
          createStory={this.createStory}
          removePicture={this.removePicture}
        />
      </div>
    );
  }
}

NewStory.propTypes = {
  triggerError: PropTypes.func.isRequired,
  toggleStoryCreation: PropTypes.func.isRequired,
};

export default NewStory;
