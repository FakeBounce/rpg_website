import {
  PRINT_ERROR,
  TOGGLE_PLAYER_VIEW,
  TOGGLE_PLAYER_MASTERING,
  UPDATE_CURRENT_STORY,
  SET_GAME_MASTER,
  SET_IS_AUTH,
  SET_IS_ADMIN,
  SET_ALL_STORIES,
  SET_STORY_USERS,
  RESET_APP,
  SET_APP_VERSION
} from '../actionsTypes/actionsTypesAppState';

const initialState = {
  currentStory: '',
  isOnPlayerView: true,
  isGameMaster: false,
  isAuth: false,
  isAdmin: false,
  gameMaster: '',
  error: '',
  stories: [],
  users: [],
  version: '',
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case PRINT_ERROR: {
      console.log('printingError', action);
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
    case SET_IS_AUTH: {
      return {
        ...state,
        isAuth: action.payload,
      };
    }
    case SET_IS_ADMIN: {
      return {
        ...state,
        isAdmin: action.payload,
      };
    }
    case SET_ALL_STORIES: {
      return {
        ...state,
        stories: action.payload,
      };
    }
    case SET_STORY_USERS: {
      return {
        ...state,
        users: { ...state.users, ...action.payload },
      };
    }
    case RESET_APP: {
      return initialState;
    }
    case SET_APP_VERSION: {
      return {
        ...state,
        version: action.payload,
      };
    }
    default:
      return state;
  }
};

export default appState;
