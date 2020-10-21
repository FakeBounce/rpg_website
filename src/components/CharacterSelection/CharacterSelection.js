import React, { useState } from 'react';

import CharacterCreationPanel from '../CharacterCreation/CharacterCreationPanel';
import PropTypes from 'prop-types';
import CharacterPreview from './CharacterPreview';
import firebase from 'firebase';
import ButtonLarge from '../Utils/ButtonLarge';
import { useDispatch, useSelector } from 'react-redux';
import { CharacterProvider } from '../../contexts/characterContext';
import useApp from '../../hooks/useApp';
import {
  SET_CHARACTER,
  SET_CHARACTER_CREATION,
  SET_CHARACTER_ID,
} from '../../redux/actionsTypes/actionsTypesCharacter';
import { SET_ALL_CHARACTERS } from '../../redux/actionsTypes/actionsTypesUserInfos';
import useCharacter from '../../hooks/useCharacter';

const styledBoxHeader = {
  width: '100%',
  height: 60,
  marginBottom: 5,
  paddingTop: 10,
  paddingBottom: 10,
};

const styledBoxBack = {
  width: 250,
  height: 20,
  marginBottom: 25,
  textAlign: 'center',
};

const styledSideHeaders = {
  width: '25%',
  height: '100%',
  display: 'inline-block',
  float: 'left',
};

const styledCenterHeader = {
  width: '50%',
  height: '100%',
  display: 'inline-block',
  float: 'left',
  position: 'relative',
};

const CharacterSelection = () => {
  const { keepCharacter, goToCharacterForm, calculatePointsLeft } = useCharacter();
  const { chooseStory } = useApp();

  const {
    uid,
    characters,
    characterCreation,
    characterId,
    isUpdating,
  } = useSelector(store => ({
    uid: store.userInfos.uid,
    characters: store.userInfos.characters,
    characterCreation: store.userInfos.characterCreation,
    characterId: store.userInfos.characterId,
    isUpdating: store.userInfos.isUpdating,
  }));

  const getCharacters = () => {
    return Object.keys(characters).map(charKey => {
      return (
        <CharacterPreview key={`char-${charKey}`} {...characters[charKey]} />
      );
    });
  };

  if (typeof characters[1] !== 'undefined' && !characterCreation) {
    return (
      <div>
        <button style={styledBoxBack} onClick={keepCharacter}>
          Retourner sur l'histoire
        </button>
        <div style={styledBoxHeader}>Choisir un personnage</div>
        <button onClick={goToCharacterForm}>Créer un personnage</button>
        <div style={styledBoxHeader}>Vos personnages :</div>
        {getCharacters()}
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div style={styledBoxHeader}>
        <div style={styledSideHeaders}>
          <ButtonLarge
            onClick={() => {
              chooseStory(-1);
            }}
          >
            Select another story
          </ButtonLarge>
        </div>
        <div style={styledCenterHeader}>
          {isUpdating ? 'Update a character' : 'Create a character'}
        </div>
      </div>
      <CharacterProvider
        uid={uid}
        id={isUpdating ? characterId : Object.keys(characters).length + 1}
        isUpdating={isUpdating}
        character={isUpdating ? { ...characters[characterId] } : {}}
        totalPointsleft={calculatePointsLeft()}
      >
        <CharacterCreationPanel
          id={isUpdating ? characterId : Object.keys(characters).length + 1}
          isUpdating={isUpdating}
          character={isUpdating ? { ...characters[characterId] } : {}}
        />
      </CharacterProvider>
    </div>
  );
};

export default CharacterSelection;
