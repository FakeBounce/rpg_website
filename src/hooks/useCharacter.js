import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_CHARACTER,
  CALL_SELECT_OTHER_CHARACTER,
  CALL_CREATE_CHARACTER,
} from '../redux/actionsTypes/actionsTypesCharacter';
import {
  SET_IS_UPDATING,
  SETUP_CHARACTER_CREATION,
} from '../redux/actionsTypes/actionsTypesUserInfos';

const useCharacter = () => {
  const dispatch = useDispatch();

  const { oldCharacterId, characterId, pseudo, uid, characters } = useSelector(
    store => ({
      currentStory: store.appState.currentStory,
      pseudo: store.userInfos.pseudo,
      uid: store.userInfos.uid,
      characters: store.userInfos.characters,
      characterId: store.userInfos.characterId,
      oldCharacterId: store.userInfos.oldCharacterId,
    }),
  );

  const dispatchUpdateCharacter = () => {
    dispatch({ type: UPDATE_CHARACTER });
  };

  const dispatchCallSelectOtherCharacter = payload => {
    dispatch({ type: CALL_SELECT_OTHER_CHARACTER, payload });
  };

  const dispatchSetupCharacterCreation = payload => {
    dispatch({ type: SETUP_CHARACTER_CREATION, payload });
  };

  const dispatchCreateCharacter = payload => {
    dispatch({ type: CALL_CREATE_CHARACTER, payload });
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
    dispatchSetupCharacterCreation({
      characterCreation: true,
      characterId: id,
    });
  };

  const goToCharacterForm = () => {
    dispatchSetupCharacterCreation({
      characterCreation: true,
    });
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

  const createCharacter = (character, picture) => {
    const charForStory = { ...character };
    charForStory.gold =
      Math.floor(Math.random() * character.attributes.luck + 1) * 5;
    charForStory.status = 'OK';
    charForStory.userPseudo = pseudo;
    charForStory.userUid = uid;

    dispatchCreateCharacter({ character, charForStory, picture });
  };

  const calculatePointsLeft = id => {
    if (id !== '') {
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
      } = characters[id];

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
    }
    return 0;
  };

  const keepCharacter = () => {
    dispatchSetupCharacterCreation({
      characterId: oldCharacterId,
      characterCreation: false,
      oldCharacterId: '',
    });
  };

  const selectAnotherCharacter = () => {
    dispatchSetupCharacterCreation({
      oldCharacterId: characterId,
      characterId: '',
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
