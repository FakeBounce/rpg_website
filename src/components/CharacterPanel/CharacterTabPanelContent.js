import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { widthRightPanelLeft } from '../Utils/StyleConstants';
import firebase from 'firebase';
import ButtonLarge from '../Utils/ButtonLarge';
import { useSelector } from 'react-redux';

const styledTabPanelItem = {
  width: `${widthRightPanelLeft - 6}px`,
  paddingHorizontal: 5,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
};

const styledItemButton = {
  width: 50,
  height: 30,
  position: 'relative',
  float: 'right',
  display: 'inline-block',
  padding: 0,
  margin: 0,
  textAlign: 'center',
};

const styledItemDescription = {
  width: `${widthRightPanelLeft - 70}px`,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  padding: 0,
  margin: 0,
  textAlign: 'center',
};

const CharacterTabPanelContent = ({ tab, tabName }) => {
  const [newValue, setNewValue] = useState('');

  const { currentStory, character } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    character: store.character,
  }));

  const onChange = value => {
    setNewValue(value);
  };

  const onValidate = () => {
    if (newValue !== '') {
      let obj = [];
      if (tab) obj = [...tab];
      obj.push(newValue);

      // @Todo : sagas
      firebase
        .database()
        .ref(
          'stories/' +
            currentStory +
            '/characters/' +
            character.userUid +
            '/character/' +
            tabName.toLowerCase(),
        )
        .set(obj)
        .catch(error => {
          // Handle Errors here.
          console.log('Error', error);
        });
    }
  };

  const onRemove = i => {
    const obj = [...tab];
    obj.splice(i, 1);

    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/characters/' +
          character.userUid +
          '/character/' +
          tabName.toLowerCase(),
      )
      .set(obj)
      .catch(error => {
        // Handle Errors here.
        console.log('Error', error);
      });
  };

  return (
    <div>
      {tab.map((description, index) => {
        return (
          <div key={`${description}-${index}`} style={styledTabPanelItem}>
            <div style={styledItemDescription}>{description}</div>
            <ButtonLarge
              style={styledItemButton}
              onClick={() => onRemove(index)}
            >
              Remove
            </ButtonLarge>
          </div>
        );
      })}
      <div style={styledTabPanelItem}>
        <input
          type='text'
          placeholder={`${tabName} + description if needed`}
          value={newValue}
          onChange={e => {
            onChange(e.target.value);
          }}
        />
        <ButtonLarge style={styledItemButton} onClick={onValidate}>
          Add {tabName.toLowerCase()}
        </ButtonLarge>
      </div>
    </div>
  );
};

CharacterTabPanelContent.defaultProps = {
  tabName: '',
};

CharacterTabPanelContent.propTypes = {
  tab: PropTypes.array.isRequired,
  tabName: PropTypes.string,
};

export default CharacterTabPanelContent;
