import * as actionTypesMapInfos from "../actionsTypes/actionsTypesMapInfos";

export const setTilesTypes = payload => {
  return {
    type: actionTypesMapInfos.SET_TILES_TYPES,
    payload,
  };
};

export const setMapTiles = payload => {
  return {
    type: actionTypesMapInfos.SET_MAP_TILES,
    payload,
  };
};
