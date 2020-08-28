import { SET_CHARACTER } from '../actionsTypes/actionsTypesCharacter';
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
  abilites: [],
  skills: [],
  items: [],
  education: 0,
  gold: 0,
};

const character = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default character;
