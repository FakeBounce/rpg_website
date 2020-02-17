import {
  SET_CURRENT_EVENT,
  SET_EVENTS_HISTORY,
} from "../actionsTypes/actionsTypesEvents";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  currentEvent: -1,
  history: [],
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_EVENT: {
      return {
        ...state,
        currentEvent: action.payload,
      };
    }
    case SET_EVENTS_HISTORY: {
      return {
        ...state,
        history: action.payload,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default events;
