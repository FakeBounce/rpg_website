import { SET_CURRENT_EVENT } from "../actionsTypes/actionsTypesEvents";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  currentEvent: -1,
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_EVENT: {
      return {
        ...state,
        currentEvent: action.payload,
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
