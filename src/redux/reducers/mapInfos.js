import {
  SET_TILES_TYPES,
  SET_MAP_TILES,
  SET_CURRENT_X,
  SET_CURRENT_Y,
  SET_CURRENT_ZOOM,
  SET_CURRENT_POSITION,
  SET_CURRENT_SCALE,
  SET_CURRENT_TOWN,
  SET_CURRENT_TILE,
  SET_TEXTURE_TO_APPLY,
} from "../actionsTypes/actionsTypesMapInfos";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  tilesTypes: {},
  map: [],
  currentX: 0,
  currentY: 0,
  currentZoom: 10,
  currentScale: 1,
  currentTile: {},
  currentTown: -1,
  textureToApply: null,
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
    case SET_CURRENT_X: {
      return {
        ...state,
        currentX: action.payload,
      };
    }
    case SET_CURRENT_Y: {
      return {
        ...state,
        currentY: action.payload,
      };
    }
    case SET_CURRENT_ZOOM: {
      return {
        ...state,
        currentZoom: action.payload,
      };
    }
    case SET_CURRENT_POSITION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_CURRENT_SCALE: {
      return {
        ...state,
        currentScale: action.payload,
      };
    }
    case SET_CURRENT_TOWN: {
      return {
        ...state,
        currentTown: action.payload,
      };
    }
    case SET_CURRENT_TILE: {
      return {
        ...state,
        currentTile: action.payload,
      };
    }
    case SET_TEXTURE_TO_APPLY: {
      return {
        ...state,
        textureToApply: action.payload,
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
