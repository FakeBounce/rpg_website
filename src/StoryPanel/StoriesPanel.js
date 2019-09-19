import React, { Component } from "react";
import PropTypes from "prop-types";
import Story from "./Story";
import ButtonLarge from "../Utils/ButtonLarge";
import { defaultStory, mapNames } from "../Utils/Constants";
import firebase from "firebase";
import { loadStories } from "../Utils/DatabaseFunctions";

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
  };

  onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  toggleStoryCreation = bool => () => {
    this.setState(state => ({
      ...state,
      isCreatingStory: bool,
    }));
  };
  createStory = () => {
    const { stories, triggerError, chooseStory, doSetState } = this.props;
    const { name, map } = this.state;

    const story = {
      ...defaultStory,
      name,
      map,
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
    const { stories, chooseStory, isAdmin } = this.props;
    const { isCreatingStory, name, map } = this.state;
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
              <select
                value={map}
                onChange={e => {
                  this.onChange("map", e.target.value);
                }}
                style={styledMapSelect}
              >
                {mapNames.map(sts => {
                  return (
                    <option key={sts} value={sts}>
                      {sts}
                    </option>
                  );
                })}
              </select>
            </div>

            {name !== "" &&
              map !== "" && (
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
        <div>
        {stories.map((s, index) => {
          return (
            <Story
              key={`${s.name}-${index}`}
              chooseStory={chooseStory}
              index={index}
              name={s.name}
              totalStories={stories.length}
            />
          );
        })}
        </div>
        {isAdmin && (
          <ButtonLarge onClick={this.toggleStoryCreation(true)}>
            Create a story
          </ButtonLarge>
        )}
      </div>
    );
  }
}

StoriesPanel.propTypes = {
  stories: PropTypes.array.isRequired,
  chooseStory: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default StoriesPanel;
