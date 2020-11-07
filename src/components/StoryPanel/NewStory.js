import React from 'react';
import PropTypes from 'prop-types';
import { colors, defaultStory, defaultCharacterGM } from '../Utils/Constants';
import firebase from 'firebase';
import NewStoryForm from './NewStoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { cursorPointer } from '../Utils/StyleConstants';
import { CALL_CREATE_STORY } from '../../redux/actionsTypes/actionsTypesAppState';

const styledStoryPanel = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const styledNewStoryTitleContainer = {
  width: '100%',
  marginTop: 30,
  marginBottom: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const styledNewStoryTitle = {
  letterSpacing: 13,
  margin: 0,
};

const NewStory = ({ toggleStoryCreation }) => {
  const dispatch = useDispatch();
  const { uid, pseudo } = useSelector(store => ({
    uid: store.userInfos.uid,
    pseudo: store.userInfos.pseudo,
  }));

  const callCreateStory = payload => {
    dispatch({ type: CALL_CREATE_STORY, payload });
  };

  const createStory = (name, map, iconPath) => {
    const story = {
      ...defaultStory,
      name,
      map,
      gameMaster: firebase.auth().currentUser.uid,
      wallpaper: iconPath,
      characters: {
        [uid]: {
          characterId: 'GameMaster',
          character: {
            ...defaultCharacterGM,
            userPseudo: pseudo,
            userUid: uid,
          },
        },
      },
    };

    callCreateStory({ story });
  };

  return (
    <div style={styledStoryPanel}>
      <div style={styledNewStoryTitleContainer}>
        <Icon
          style={{
            marginRight: 40,
            maxWidth: 50,
            maxHeight: 50,
            cursor: cursorPointer,
          }}
          onClick={toggleStoryCreation(false)}
          circular
          inverted
          name='cancel'
          color={colors.red300}
        />
        <h1 style={styledNewStoryTitle}>Create your story</h1>
      </div>

      <NewStoryForm createStory={createStory} />
    </div>
  );
};

NewStory.propTypes = {
  toggleStoryCreation: PropTypes.func.isRequired,
};

export default NewStory;
