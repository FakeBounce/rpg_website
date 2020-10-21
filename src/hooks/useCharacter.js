import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import {
  UPDATE_CHARACTER,
  CALL_SELECT_OTHER_CHARACTER,
  SET_CHARACTER_ID,
  SET_CHARACTER_CREATION,
  SET_CHARACTER,
} from '../redux/actionsTypes/actionsTypesCharacter';
import {
  SET_IS_UPDATING,
  SET_ALL_CHARACTERS,
  SETUP_CHARACTER_CREATION,
} from '../redux/actionsTypes/actionsTypesUserInfos';
import useApp from './useApp';

const useCharacter = () => {
  const dispatch = useDispatch();
  const { triggerError } = useApp();

  const {
    oldCharacterId,
    oldCharacterCreation,
    characterId,
    characterCreation,
    currentStory,
    pseudo,
    uid,
    characters,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    pseudo: store.userInfos.pseudo,
    uid: store.userInfos.uid,
    characters: store.userInfos.characters,
    characterCreation: store.userInfos.characterCreation,
    characterId: store.userInfos.characterId,
    characterCreation: store.userInfos.characterCreation,
    oldCharacterId: store.userInfos.oldCharacterId,
    oldCharacterCreation: store.userInfos.oldCharacterCreation,
  }));

  const dispatchUpdateCharacter = () => {
    dispatch({ type: UPDATE_CHARACTER });
  };

  const dispatchCallSelectOtherCharacter = () => {
    dispatch({ type: CALL_SELECT_OTHER_CHARACTER });
  };
  const dispatchSetupCharacterCreation = payload => {
    dispatch({ type: SETUP_CHARACTER_CREATION, payload });
  };

  const chooseCharacter = id => {
    const charToRegister = characters[id];
    charToRegister.gold = Math.floor(
      Math.random() * characters[id].attributes.luck * 5 + 5,
    );
    charToRegister.status = 'OK';
    dispatchCallSelectOtherCharacter({
      character: charToRegister,
      characterId: id,
    });
  };

  const modifyCharacter = id => {
    dispatch({ type: SET_IS_UPDATING, payload: true });
    dispatch({ type: SET_CHARACTER_ID, payload: id });
    dispatch({ type: SET_CHARACTER_CREATION, payload: true });
  };

  const goToCharacterForm = () => {
    dispatch({ type: SET_CHARACTER_CREATION, payload: true });
  };

  const updateCharacter = character => {
    dispatch({ type: SET_IS_UPDATING, payload: true });
    const charTab = characters;
    charTab[character.id] = character;
    dispatchUpdateCharacter({
      character,
      characterId: character.id,
    });
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
    dispatch({ type: SET_ALL_CHARACTERS, payload: charTab });
    dispatch({ type: SET_CHARACTER_ID, payload: character.id });
    dispatch({ type: SET_CHARACTER, payload: charToRegister });

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
            // chooseStory(currentStory);
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
    } = characters[characterId];

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

  const keepCharacter = () => {
    dispatchSetupCharacterCreation({
      characterId: oldCharacterId,
      characterCreation: oldCharacterCreation,
      oldCharacterId: 0,
      oldCharacterCreation: false,
    });
  };

  const selectAnotherCharacter = () => {
    dispatchSetupCharacterCreation({
      oldCharacterId: characterId,
      oldCharacterCreation: characterCreation,
      characterId: 0,
      characterCreation: false,
    });
  };

  return {
    chooseCharacter,
    modifyCharacter,
    goToCharacterForm,
    updateCharacter,
    createCharacter,
    keepCharacter,
    selectAnotherCharacter,
    calculatePointsLeft,
  };
};

export default useCharacter;
