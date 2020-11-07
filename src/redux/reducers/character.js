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
  abilities: [],
  skills: [],
  items: [],
  education: 0,
  gold: 0,
};

const character = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTER: {
      const tempCharacter = { ...state, ...action.payload };
      if (
        (action.payload.weapons && action.payload.weapons.length === 0) ||
        !action.payload.weapons
      ) {
        tempCharacter.weapons = [];
      }
      if (
        (action.payload.abilities && action.payload.abilities.length === 0) ||
        !action.payload.abilities
      ) {
        tempCharacter.abilities = [];
      }
      if (
        (action.payload.skills && action.payload.skills.length === 0) ||
        !action.payload.skills
      ) {
        tempCharacter.skills = [];
      }
      if (
        (action.payload.items && action.payload.items.length === 0) ||
        !action.payload.items
      ) {
        tempCharacter.items = [];
      }
      return tempCharacter;
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default character;
