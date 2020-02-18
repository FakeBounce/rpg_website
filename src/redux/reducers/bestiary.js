import { SET_BESTIARY_LIST } from "../actionsTypes/actionsTypesBestiary";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  bestiary: [],
};

const bestiary = (state = initialState, action) => {
  switch (action.type) {
    case SET_BESTIARY_LIST: {
      return {
        ...state,
        bestiary: action.payload,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default bestiary;
