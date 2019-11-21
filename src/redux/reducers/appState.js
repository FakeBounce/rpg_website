import { PRINT_ERROR } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  currentStory: -1,
  error: "",
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case PRINT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default appState;
