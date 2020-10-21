import {
  SET_USER_PSEUDO,
  SET_UID,
  SET_USER_INFOS,
  SET_ALL_CHARACTERS,
  SETUP_CHARACTER_CREATION,
  SET_IS_UPDATING,
} from '../actionsTypes/actionsTypesUserInfos';
import { RESET_APP } from '../actionsTypes/actionsTypesAppState';

const initialState = {
  pseudo: '',
  uid: '',
  email: '',
  password: '',
  characters: [],
  isUpdating: false,
};

const userInfos = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PSEUDO: {
      return {
        ...state,
        pseudo: action.payload,
      };
    }
    case SET_UID: {
      return {
        ...state,
        uid: action.payload,
      };
    }
    case SETUP_CHARACTER_CREATION:
    case SET_USER_INFOS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_ALL_CHARACTERS: {
      return {
        ...state,
        characters: action.payload,
      };
    }
    case SET_IS_UPDATING: {
      return {
        ...state,
        isUpdating: action.payload,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default userInfos;
