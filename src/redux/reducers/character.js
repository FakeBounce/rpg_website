import { SET_CHARACTER, SET_CHARACTER_CREATION, SET_CHARACTER_ID } from '../actionsTypes/actionsTypesCharacter';
import { RESET_APP } from '../actionsTypes/actionsTypesAppState';

const initialState = {
  health: 0,
  maxHealth: 0,
  mentalState: 0,
  maxMentalState: 0,
  icon: '',
  name: '',
  status: '',
  weapons: [],
  abilities: [],
  skills: [],
  items: [],
  education: 0,
  gold: 0,
  characterCreation: false,
  characterId: 0,
};

const character = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_CHARACTER_ID: {
      return {
        ...state,
        characterId: action.payload,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    case SET_CHARACTER_CREATION: {
      return {
        ...state,
        characterCreation: action.payload,
      }
    }
    default:
      return state;
  }
};

export default character;
