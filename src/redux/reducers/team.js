import { SET_TEAM_CHARACTERS } from "../actionsTypes/actionsTypesTeam";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  characters: [],
};

const team = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAM_CHARACTERS: {
      return {
        ...state,
        characters: action.payload,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default team;
