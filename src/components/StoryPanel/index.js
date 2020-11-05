import React, { useState } from 'react';
import Story from './Story';
import NewStory from './NewStory';
import { useSelector } from 'react-redux';
import { cursorPointer } from '../Utils/StyleConstants';
import useApp from '../../hooks/useApp';

const styledStoryPanel = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingBottom: 30,
};

const styledChooseStoryTitle = {
  width: '100%',
  marginTop: 30,
  marginBottom: 30,
  display: 'flex',
  justifyContent: 'center',
  letterSpacing: 13,
};

const styledStoriesContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
};

const styledStoryBoxAddStory = {
  marginTop: 30,
  cursor: cursorPointer,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const styledAddStoryTitle = {
  marginBottom: 30,
  fontSize: 23,
  fontWeight: 'bolder',
};

const styledAddStoryImage = {
  width: 300,
  height: 300,
  border: '2px solid white',
  borderRadius: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const StoriesPanel = () => {
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const { chooseStory, triggerError } = useApp();

  const { stories } = useSelector(store => ({
    stories: store.appState.stories,
  }));

  const toggleStoryCreation = bool => () => {
    setIsCreatingStory(bool);
  };

  if (isCreatingStory) {
    return <NewStory toggleStoryCreation={toggleStoryCreation} />;
  }
  return (
    <div style={styledStoryPanel}>
      <h1 style={styledChooseStoryTitle}>Choose a story</h1>
      <div style={styledStoriesContainer}>
        {stories &&
          Object.keys(stories).map(sKey => {
            return (
              <Story
                key={sKey}
                chooseStory={() => chooseStory(sKey)}
                name={stories[sKey].name}
                wallpaper={stories[sKey].wallpaper}
                triggerError={triggerError}
              />
            );
          })}

        <div
          onClick={toggleStoryCreation(true)}
          style={{
            ...styledStoryBoxAddStory,
          }}
        >
          <div style={styledAddStoryTitle}>Create a story</div>
          <div style={styledAddStoryImage} alt='Add a story image'>
            <p style={{ fontSize: 72 }}>+</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesPanel;
