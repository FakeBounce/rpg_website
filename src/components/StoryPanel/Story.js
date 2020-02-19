import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { heightHeader, cursorPointer } from "../Utils/StyleConstants";
import firebase from "firebase";

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

const Story = ({
  wallpaper,
  triggerError,
  index,
  name,
  chooseStory,
  totalStories,
}) => {
  const [icon, setIcon] = useState("");
  let storageRef = firebase.storage().ref();

  useEffect(() => {
    storageRef
      .child(wallpaper)
      .getDownloadURL()
      .then(url => {
        setIcon(url);
      })
      .catch(error => {
        // Handle any errors
        triggerError(error);
      });
  }, [wallpaper]);

  return (
    <div
      onClick={chooseStory}
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
        src={icon}
        style={{
          ...styles.storyImage,
          width: "80%",
          height: "90%",
        }}
        alt="dravos"
      />
    </div>
  );
};

Story.propTypes = {
  chooseStory: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  wallpaper: PropTypes.string.isRequired,
  totalStories: PropTypes.number.isRequired,
};

export default Story;
