import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightHeader, cursorPointer } from '../Utils/StyleConstants';

const styles = {
  storyBox: {
    marginTop: 30,
    cursor: cursorPointer,
  },
  storyTitle: {
    fontSize: 23,
    fontWeight: 'bolder',
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
          width: window.innerWidth / totalStories,
          height: (window.innerHeight - heightHeader) / totalStories,
        }}
      >
        <div style={styles.storyTitle}>{name}</div>
        <img
          src={'./common/dravos.jpg'}
          style={{
            ...styles.storyImage,
            width: (window.innerHeight - heightHeader - 50) / totalStories,
            height: (window.innerHeight - heightHeader - 50) / totalStories,
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
