import React from 'react';
import PropTypes from 'prop-types';
import { colors, defaultStory } from '../Utils/Constants';
import firebase from 'firebase';
import { loadStories } from '../Utils/DatabaseFunctions';
import NewStoryForm from './NewStoryForm';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { cursorPointer } from '../Utils/StyleConstants';
import useApp from '../../hooks/useApp';

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

// @TODO check this component, setState isnt used
const NewStory = ({ toggleStoryCreation }) => {
  const { triggerError, chooseStory } = useApp();

  const { stories } = useSelector(store => ({
    stories: store.appState.stories,
  }));
  const createStory = (name, map, iconPath) => {
    const story = {
      ...defaultStory,
      name,
      map,
      gameMaster: firebase.auth().currentUser.uid,
      wallpaper: iconPath,
    };

    const lastStoryIndex = stories.length;
    //@Todo : sagas
    firebase
      .database()
      .ref('stories/' + lastStoryIndex)
      .set(story)
      .then(() => {
        loadStories(() => {
          chooseStory(lastStoryIndex);
        });
        // @TODO
        // this.setState(state => ({
        //   ...state,
        //   isCreatingStory: false,
        //   name: '',
        //   map: '',
        // }));
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
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
