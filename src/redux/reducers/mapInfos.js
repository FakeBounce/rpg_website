import {
  SET_TILES_TYPES,
  SET_MAP_TILES,
} from "../actionsTypes/actionsTypesMapInfos";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  tilesTypes: {},
  map: [],
};

const mapInfos = (state = initialState, action) => {
  switch (action.type) {
    case SET_TILES_TYPES: {
      return {
        ...state,
        tilesTypes: action.payload,
      };
    }
    case SET_MAP_TILES: {
      return {
        ...state,
        map: action.payload,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default mapInfos;
