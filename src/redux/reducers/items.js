import {
  SET_ITEM_LIST,
  SET_ARTEFACT_LIST,
} from "../actionsTypes/actionsTypesItems";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  items: [],
  artefacts: [],
};

const items = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM_LIST: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case SET_ARTEFACT_LIST: {
      return {
        ...state,
        artefacts: action.payload,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default items;
