import React, { useState } from 'react';

import CharacterCreationPanel from '../CharacterCreation/CharacterCreationPanel';
import PropTypes from 'prop-types';
import CharacterPreview from './CharacterPreview';
import firebase from 'firebase';
import ButtonLarge from '../Utils/ButtonLarge';
import { useSelector } from 'react-redux';
import { CharacterProvider } from '../../contexts/characterContext';
import useApp from '../../hooks/useApp';

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

const CharacterSelection = ({
  chooseStory,
  doSetState,
  characterCreation,
  keepCharacter,
}) => {
  const [isAnUpdate, setIsAnUpdate] = useState(false);
  const [updateCharacterId, setUpdateCharacterId] = useState(1);

  const { triggerError } = useApp();

  const { currentStory, pseudo, uid, characters } = useSelector(
    store => ({
      currentStory: store.appState.currentStory,
      pseudo: store.userInfos.pseudo,
      uid: store.userInfos.uid,
      characters: store.userInfos.characters,
    }),
  );

  const getCharacters = () => {
    return Object.keys(characters).map(char => {
      return (
        <CharacterPreview
          key={`char-${char.name}`}
          {...characters[char]}
          chooseCharacter={chooseCharacter}
          modifyCharacter={modifyCharacter}
        />
      );
    });
  };

  const modifyCharacter = id => {
    setIsAnUpdate(true);
    setUpdateCharacterId(id);
    doSetState({
      characterCreation: true,
    });
  };

  const chooseCharacter = id => {
    const charToRegister = characters[id];
    charToRegister.gold = Math.floor(
      Math.random() * characters[id].attributes.luck * 5 + 5,
    );
    charToRegister.status = 'OK';
    // @TODO : sagas
    firebase
      .database()
      .ref('stories/' + currentStory + '/characters/' + uid)
      .set({ character: charToRegister, characterId: id })
      .then(() => {
        doSetState(
          {
            character: charToRegister,
            characterId: id,
          },
          () => {
            chooseStory(currentStory);
          },
        );
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const goToCharacterForm = () => {
    doSetState({
      characterCreation: true,
    });
  };

  const updateCharacter = character => {
    setIsAnUpdate(true);
    setUpdateCharacterId(0);
    const charTab = characters;
    charTab[character.id] = character;
    doSetState(
      {
        characters: charTab,
        characterId: character.id,
        character,
      },
      () => {
        firebase
          .database()
          .ref('users/' + uid + '/characters')
          .set({ ...charTab })
          .then(() => {
            // @TODO : sagas
            firebase
              .database()
              .ref('stories/' + currentStory + '/characters/' + uid)
              .set({
                character,
                characterId: character.id,
              })
              .then(() => {
                chooseStory(currentStory);
              })
              .catch(error => {
                // Handle Errors here.
                triggerError(error);
              });
          })
          .catch(error => {
            // Handle Errors here.
            triggerError(error);
          });
      },
    );
  };

  const createCharacter = character => {
    const charTab = characters;

    const charToRegister = character;
    charToRegister.gold =
      Math.floor(Math.random() * character.attributes.luck + 1) * 5;
    charToRegister.status = 'OK';
    charToRegister.userPseudo = pseudo;
    charToRegister.userUid = uid;

    charTab[character.id] = charToRegister;
    doSetState(
      {
        characters: charTab,
        characterId: character.id,
        character: charToRegister,
      },
      () => {
        firebase
          .database()
          .ref('users/' + uid + '/characters')
          .set({ ...charTab })
          .then(() => {
            firebase
              .database()
              .ref('stories/' + currentStory + '/characters/' + uid)
              .set({
                character: charToRegister,
                characterId: character.id,
              })
              .then(() => {
                chooseStory(currentStory);
              })
              .catch(error => {
                // Handle Errors here.
                triggerError(error);
              });
          })
          .catch(error => {
            // Handle Errors here.
            triggerError(error);
          });
      },
    );
  };

  const resetStory = () => {
    chooseStory(-1);
  };

  const calculatePointsLeft = () => {
    const {
      attributes: {
        strength,
        dexterity,
        luck,
        charisma,
        education,
        magic,
        perception,
        constitution,
        willpower = 50,
      },
    } = characters[updateCharacterId];

    return (
      450 -
      strength -
      dexterity -
      luck -
      constitution -
      charisma -
      education -
      magic -
      perception -
      willpower
    );
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
          <ButtonLarge onClick={resetStory}>Select another story</ButtonLarge>
        </div>
        <div style={styledCenterHeader}>
          {isAnUpdate ? 'Update a character' : 'Create a character'}
        </div>
      </div>
      <CharacterProvider
        uid={uid}
        id={isAnUpdate ? updateCharacterId : Object.keys(characters).length + 1}
        isAnUpdate={isAnUpdate}
        character={isAnUpdate ? { ...characters[updateCharacterId] } : {}}
        totalPointsleft={calculatePointsLeft()}
      >
        <CharacterCreationPanel
          id={
            isAnUpdate ? updateCharacterId : Object.keys(characters).length + 1
          }
          createCharacter={createCharacter}
          updateCharacter={updateCharacter}
          triggerError={triggerError}
          isAnUpdate={isAnUpdate}
          character={isAnUpdate ? { ...characters[updateCharacterId] } : {}}
        />
      </CharacterProvider>
    </div>
  );
};

CharacterSelection.propTypes = {
  characterCreation: PropTypes.bool.isRequired,
  chooseStory: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  keepCharacter: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default CharacterSelection;
