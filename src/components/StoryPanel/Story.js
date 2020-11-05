import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';
import firebase from 'firebase';

const styles = {
  storyBox: {
    marginTop: 30,
    cursor: cursorPointer,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  storyTitle: {
    marginBottom: 30,
    fontSize: 23,
    fontWeight: 'bolder',
  },
  storyImage: { width: 300, height: 300, borderRadius: 300 },
};

const Story = ({ wallpaper, triggerError, name, chooseStory }) => {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (wallpaper) {
      let storageRef = firebase.storage().ref();
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
    }
  }, [wallpaper, triggerError]);

  return (
    <div
      onClick={chooseStory}
      style={{
        ...styles.storyBox,
      }}
    >
      <div style={styles.storyTitle}>{name}</div>
      <img
        src={icon}
        style={{
          ...styles.storyImage,
        }}
        className={'borderOnHover'}
        alt='dravos'
      />
    </div>
  );
};

Story.propTypes = {
  chooseStory: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  wallpaper: PropTypes.string.isRequired,
};

export default Story;
