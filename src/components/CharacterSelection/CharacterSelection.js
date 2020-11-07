import React from 'react';

import CharacterCreationPanel from '../CharacterCreation/CharacterCreationPanel';
import CharacterPreview from './CharacterPreview';
import ButtonLarge from '../Utils/ButtonLarge';
import { useSelector } from 'react-redux';
import { CharacterProvider } from '../../contexts/characterContext';
import useApp from '../../hooks/useApp';
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
  display: 'flex',
  justifyContent: 'center',
};

const CharacterSelection = () => {
  const { keepCharacter, goToCharacterForm } = useCharacter();
  const { chooseStory } = useApp();

  const {
    characters,
    characterCreation,
    isUpdating,
    oldCharacterId,
  } = useSelector(store => ({
    characters: store.userInfos.characters,
    characterCreation: store.userInfos.characterCreation,
    isUpdating: store.userInfos.isUpdating,
    oldCharacterId: store.userInfos.oldCharacterId,
  }));

  const getCharacters = () => {
    return Object.keys(characters).map(charKey => {
      return (
        <CharacterPreview key={`char-${charKey}`} {...characters[charKey]} />
      );
    });
  };

  if (oldCharacterId !== '' && !characterCreation) {
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

  if (oldCharacterId !== '' && characterCreation) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div style={styledBoxHeader}>
          <div style={styledCenterHeader}>
            {isUpdating ? 'Update a character' : 'Create a character'}
          </div>
          <ButtonLarge style={styledBoxBack} onClick={keepCharacter}>
            Retourner sur l'histoire
          </ButtonLarge>
        </div>
        <CharacterProvider>
          <CharacterCreationPanel />
        </CharacterProvider>
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
              chooseStory('');
            }}
          >
            Select another story
          </ButtonLarge>
        </div>
        <div style={styledCenterHeader}>
          {isUpdating ? 'Update a character' : 'Create a character'}
        </div>
      </div>
      <CharacterProvider>
        <CharacterCreationPanel />
      </CharacterProvider>
    </div>
  );
};

export default CharacterSelection;
