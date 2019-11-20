import React, { Component } from "react";
import PropTypes from "prop-types";
import Story from "./Story";
import ButtonLarge from "../Utils/ButtonLarge";
import NewStory from "./NewStory";

const styledStoryPanel = {
  width: "100%",
  height: "100%",
  textAlign: "center",
};

class StoriesPanel extends Component {
  state = {
    isCreatingStory: false,
  };

  toggleStoryCreation = bool => () => {
    this.setState(state => ({
      ...state,
      isCreatingStory: bool,
    }));
  };

  render() {
    const {
      stories,
      chooseStory,
      doSetState,
      signOut,
      triggerError,
    } = this.props;
    const { isCreatingStory } = this.state;
    if (isCreatingStory) {
      return (
        <NewStory
          stories={stories}
          doSetState={doSetState}
          triggerError={triggerError}
          toggleStoryCreation={this.toggleStoryCreation}
        />
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
