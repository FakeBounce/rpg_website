import React, { Component } from "react";
import PropTypes from "prop-types";
import { heightHeader, cursorPointer } from "../Utils/StyleConstants";

const styles = {
  storyBox: {
    marginTop: 30,
    cursor: cursorPointer,
    position: "relative",
    display: "inline-block",
    float: "left",
  },
  storyTitle: {
    marginBottom: 15,
    fontSize: 23,
    fontWeight: "bolder",
  },
  storyImage: { width: 150, height: 150 },
};

class Story extends Component {
  render() {
    const { index, name, chooseStory, totalStories } = this.props;

    return (
      <div
        onClick={() => chooseStory(index)}
        style={{
          ...styles.storyBox,
          width:
            totalStories > 4
              ? window.innerWidth / 4 - 4
              : window.innerWidth / totalStories - totalStories,

          borderRight: index !== totalStories - 1 ? "1px solid black" : "",
          height:
            totalStories > 4
              ? totalStories > 8
                ? (window.innerHeight - heightHeader) / 4
                : (window.innerHeight - heightHeader) / totalStories - 4
              : window.innerHeight - heightHeader,
        }}
      >
        <div style={styles.storyTitle}>{name}</div>
        <img
          src={"./common/dravos.jpg"}
          style={{
            ...styles.storyImage,
            width: "80%",
            height: "90%",
          }}
          alt="dravos"
        />
      </div>
    );
  }
}

Story.propTypes = {
  chooseStory: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  totalStories: PropTypes.number.isRequired,
};

export default Story;
