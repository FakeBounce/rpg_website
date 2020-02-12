import {
  PRINT_ERROR,
  TOGGLE_PLAYER_VIEW,
  TOGGLE_PLAYER_MASTERING,
  UPDATE_CURRENT_STORY,
  SET_GAME_MASTER,
} from "../actionsTypes/actionsTypesAppState";

const initialState = {
  currentStory: -1,
  isOnPlayerView: true,
  isGameMaster: false,
  gameMaster: "",
  error: "",
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case PRINT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case UPDATE_CURRENT_STORY: {
      return {
        ...state,
        currentStory: action.payload,
      };
    }
    case SET_GAME_MASTER: {
      return {
        ...state,
        gameMaster: action.payload,
      };
    }
    case TOGGLE_PLAYER_VIEW: {
      return {
        ...state,
        isOnPlayerView: !state.isOnPlayerView,
      };
    }
    case TOGGLE_PLAYER_MASTERING: {
      return {
        ...state,
        isGameMaster: action.payload,
      };
    }
    default:
      return state;
  }
};

export default appState;
