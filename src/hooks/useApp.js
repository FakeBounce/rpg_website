import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import {
  CALL_PRINT_ERROR,
  CALL_SIGN_OUT,
  TOGGLE_PLAYER_MASTERING,
  UPDATE_CURRENT_STORY,
  SET_GAME_MASTER,
} from '../redux/actionsTypes/actionsTypesAppState';
import {
  SETUP_CHARACTER_CREATION,
} from '../redux/actionsTypes/actionsTypesUserInfos';
import {
  CALL_LISTEN_MUSIC,
  CALL_LISTEN_NOISE,
  CALL_LISTEN_SONG,
  TOGGLE_MUSIC,
} from '../redux/actionsTypes/actionsTypesSounds';
import { CALL_LISTEN_CHARACTER } from '../redux/actionsTypes/actionsTypesCharacter';
import {
  CALL_LISTEN_EVENTS_HISTORY,
  CALL_LISTEN_CURRENT_EVENT,
} from '../redux/actionsTypes/actionsTypesEvents';
import {
  CALL_LISTEN_MAP_TILES,
  CALL_LISTEN_CURRENT_X,
  CALL_LISTEN_CURRENT_Y,
  CALL_LISTEN_ALL_TOWNS,
  CALL_LISTEN_ALL_QUESTS,
  CALL_GET_TILES_TYPES,
} from '../redux/actionsTypes/actionsTypesMapInfos';
import { CALL_LISTEN_MERCHANT_LIST } from '../redux/actionsTypes/actionsTypesMerchants';
import { CALL_GET_ITEM_LIST } from '../redux/actionsTypes/actionsTypesItems';
import { CALL_LISTEN_CHAT_HISTORY } from '../redux/actionsTypes/actionsTypesChat';
import { CALL_LISTEN_BESTIARY } from '../redux/actionsTypes/actionsTypesBestiary';
import { CALL_LISTEN_TEAM_CHARACTERS } from '../redux/actionsTypes/actionsTypesTeam';

const useApp = () => {
  const dispatch = useDispatch();
  const {
    oldCharacterId,
    oldCharacterCreation,
    characterId,
    characterCreation,
    stories,
    uid,
  } = useSelector(store => ({
    characterId: store.userInfos.characterId,
    characterCreation: store.userInfos.characterCreation,
    oldCharacterId: store.userInfos.oldCharacterId,
    oldCharacterCreation: store.userInfos.oldCharacterCreation,
    stories: store.appState.stories,
    uid: store.appState.uid,
  }));

  const triggerError = error => {
    dispatch({ type: CALL_PRINT_ERROR, payload: error.message });
  };

  const dispatchCallListenMusic = () => {
    dispatch({ type: CALL_LISTEN_MUSIC });
  };
  const dispatchCallListenNoise = () => {
    dispatch({ type: CALL_LISTEN_NOISE });
  };
  const dispatchCallListenSong = () => {
    dispatch({ type: CALL_LISTEN_SONG });
  };
  const dispatchToggleMusic = () => {
    dispatch({
      type: TOGGLE_MUSIC,
    });
  };
  const dispatchTogglePlayerMastering = payload => {
    dispatch({
      type: TOGGLE_PLAYER_MASTERING,
      payload,
    });
  };
  const dispatchUpdateCurrentStory = payload => {
    dispatch({
      type: UPDATE_CURRENT_STORY,
      payload,
    });
  };
  const dispatchSetGameMaster = payload => {
    dispatch({
      type: SET_GAME_MASTER,
      payload,
    });
  };
  const dispatchListenCharacter = () => {
    dispatch({ type: CALL_LISTEN_CHARACTER });
  };
  const dispatchCallListenEventHistory = () => {
    dispatch({ type: CALL_LISTEN_EVENTS_HISTORY });
  };
  const dispatchCallListenChatHistory = () => {
    dispatch({ type: CALL_LISTEN_CHAT_HISTORY });
  };
  const dispatchCallListenCurrentEvent = () => {
    dispatch({ type: CALL_LISTEN_CURRENT_EVENT });
  };
  const dispatchCallListenMapTiles = () => {
    dispatch({ type: CALL_LISTEN_MAP_TILES });
  };
  const dispatchCallListenCurrentX = () => {
    dispatch({ type: CALL_LISTEN_CURRENT_X });
  };
  const dispatchCallListenCurrentY = () => {
    dispatch({ type: CALL_LISTEN_CURRENT_Y });
  };
  const dispatchCallListenMerchantList = () => {
    dispatch({ type: CALL_LISTEN_MERCHANT_LIST });
  };
  const dispatchCallListenAllTowns = () => {
    dispatch({ type: CALL_LISTEN_ALL_TOWNS });
  };
  const dispatchCallListenAllQuests = () => {
    dispatch({ type: CALL_LISTEN_ALL_QUESTS });
  };
  const dispatchCallListenBestiary = () => {
    dispatch({ type: CALL_LISTEN_BESTIARY });
  };
  const dispatchCallListenTeamCharacters = () => {
    dispatch({ type: CALL_LISTEN_TEAM_CHARACTERS });
  };
  const dispatchCallGetItemList = () => {
    dispatch({ type: CALL_GET_ITEM_LIST });
  };
  const dispatchSetupCharacterCreation = payload => {
    dispatch({ type: SETUP_CHARACTER_CREATION, payload });
  };

  const dispatchCallSignOut = () => {
    dispatch({ type: CALL_SIGN_OUT });
  };
  const dispatchCallSetTilesTypes = () => {
    dispatch({ type: CALL_GET_TILES_TYPES });
  };

  const chooseStory = i => {
    dispatchUpdateCurrentStory(i);

    if (i < 0) return null;

    dispatchCallListenBestiary();
    dispatchTogglePlayerMastering(stories[i].gameMaster === uid);

    if (
      typeof stories[i].characters !== 'undefined' &&
      typeof stories[i].characters[uid] !== 'undefined'
    ) {
      dispatchListenCharacter();
      dispatchSetGameMaster(stories[i].gameMaster);
      dispatchCallListenMapTiles();
      dispatchCallListenChatHistory();
      dispatchCallListenMusic();
      dispatchCallListenNoise();
      dispatchCallListenSong();
      dispatchCallListenMerchantList();
      dispatchCallGetItemList();
      // this.loadMerchantsAndItems();
      dispatchCallListenAllTowns();
      dispatchCallListenAllQuests();
      dispatchCallListenCurrentX();
      dispatchCallListenCurrentY();
      dispatchCallListenCurrentEvent();
      dispatchCallListenEventHistory();
    } else {
      //@TODO : Activate when GM will have proper tabs
      dispatchSetGameMaster(stories[i].gameMaster);
      dispatchCallListenMapTiles();
      dispatchCallListenChatHistory();
      dispatchCallListenMusic();
      dispatchCallListenNoise();
      dispatchCallListenSong();
      dispatchCallListenAllTowns();
      dispatchCallListenAllQuests();
      dispatchCallListenMerchantList();
      dispatchCallGetItemList();
      // this.loadMerchantsAndItems();
      dispatchCallListenCurrentEvent();
      dispatchCallListenEventHistory();
    }
    dispatchCallListenTeamCharacters();
    // firebase
    //   .database()
    //   .ref("/stories/" + i + "/characters")
    //   .on("value", snapshot => {
    //     const charactersFromStories = [];
    //     if (typeof snapshot.val() !== "undefined" && snapshot.val()) {
    //       Object.keys(snapshot.val()).map(key => {
    //         charactersFromStories.push(snapshot.val()[key].character);
    //         return null;
    //       });
    //     }
    //     this.setState(state => ({
    //       ...state,
    //       storyCharacters: charactersFromStories,
    //     }));
    //   });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatchCallSignOut();
        dispatchCallSetTilesTypes();
        firebase
          .database()
          .ref()
          .off();
      })
      .catch(error => {
        // An error happened.
        triggerError(error);
      });
  };
  const toggleMusic = () => {
    dispatchToggleMusic();
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

  const buyItem = () => {};

  return {
    triggerError,
    chooseStory,
    toggleMusic,
    dispatchCallSetTilesTypes,
    keepCharacter,
    selectAnotherCharacter,
    buyItem,
    signOut,
  };
};

export default useApp;
