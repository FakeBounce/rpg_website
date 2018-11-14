import React, { Component } from "react";
import PropTypes from "prop-types";
import Story from "./Story";

const styledStoryPanel = {
  width: '100%',
  textAlign:'center',
  position:'relative',
  float:'left',
}

class StoriesPanel extends Component {
  render() {
    const { stories, chooseStory } = this.props;

    return (
      <div style={styledStoryPanel}>
        Select a story :
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
    );
  }
}

StoriesPanel.propTypes = {
  stories: PropTypes.array.isRequired,
  chooseStory: PropTypes.func.isRequired,
};

export default StoriesPanel;
