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

export const setIsAuth = payload => {
  return {
    type: actionsTypesAppState.SET_IS_AUTH,
    payload,
  };
};

export const setIsAdmin = payload => {
  return {
    type: actionsTypesAppState.SET_IS_ADMIN,
    payload,
  };
};

export const setAllStories = payload => {
  return {
    type: actionsTypesAppState.SET_ALL_STORIES,
    payload,
  };
};

export const callListenStoryUsers = payload => {
  return {
    type: actionsTypesAppState.CALL_LISTEN_STORY_USERS,
    payload,
  };
};

export const setStoryUsers = payload => {
  return {
    type: actionsTypesAppState.SET_STORY_USERS,
    payload,
  };
};

export const resetApp = () => {
  return {
    type: actionsTypesAppState.RESET_APP,
  };
};
