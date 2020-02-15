import { SET_CHAT_HISTORY } from "../actionsTypes/actionsTypesChat";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  history: {},
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_HISTORY: {
      return {
        ...state,
        history: {
          ...state.history,
          ...action.payload,
        },
      };
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default chat;
