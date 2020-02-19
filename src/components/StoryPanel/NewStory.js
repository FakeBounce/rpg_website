import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";
import { defaultStory } from "../Utils/Constants";
import firebase from "firebase";
import { loadStories } from "../Utils/DatabaseFunctions";
import NewStoryForm from "./NewStoryForm";
import { connect } from "react-redux";

const styledStoryPanel = {
  width: "100%",
  height: "100%",
  textAlign: "center",
};

class NewStory extends Component {
  createStory = (name, map, iconPath) => {
    const { stories, triggerError, chooseStory, doSetState } = this.props;

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

  render() {
    const { toggleStoryCreation } = this.props;

    return (
      <div style={styledStoryPanel}>
        <ButtonLarge onClick={toggleStoryCreation(false)}>
          Cancel story creation
        </ButtonLarge>

        <NewStoryForm createStory={this.createStory} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  stories: store.appState.stories,
});

NewStory.propTypes = {
  triggerError: PropTypes.func.isRequired,
  chooseStory: PropTypes.func.isRequired,
  toggleStoryCreation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(NewStory);
