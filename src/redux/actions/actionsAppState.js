import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";

export const printError = payload => {
  return {
    type: actionsTypesAppState.PRINT_ERROR,
    payload,
  };
};

export const togglePlayerView = () => {
  return {
    type: actionsTypesAppState.TOGGLE_PLAYER_VIEW,
  };
};

export const togglePlayerMastering = payload => {
  return {
    type: actionsTypesAppState.TOGGLE_PLAYER_MASTERING,
    payload,
  };
};

export const updateCurrentStory = payload => {
  return {
    type: actionsTypesAppState.UPDATE_CURRENT_STORY,
    payload,
  };
};

export const setGameMaster = payload => {
  return {
    type: actionsTypesAppState.SET_GAME_MASTER,
    payload,
  };
};
