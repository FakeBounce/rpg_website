import { SET_CHARACTER } from "../actionsTypes/actionsTypesCharacter";

const initialState = {
  health: 0,
  maxHealth: 0,
  icon: "",
  name: "",
  status: "",
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
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default character;
