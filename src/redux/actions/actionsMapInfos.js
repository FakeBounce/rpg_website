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

export const setCurrentX = payload => {
  return {
    type: actionTypesMapInfos.SET_CURRENT_X,
    payload,
  };
};

export const setCurrentY = payload => {
  return {
    type: actionTypesMapInfos.SET_CURRENT_Y,
    payload,
  };
};

export const setCurrentZoom = payload => {
  return {
    type: actionTypesMapInfos.SET_CURRENT_ZOOM,
    payload,
  };
};

export const setCurrentPosition = payload => {
  return {
    type: actionTypesMapInfos.SET_CURRENT_POSITION,
    payload,
  };
};

export const setCurrentScale = payload => {
  return {
    type: actionTypesMapInfos.SET_CURRENT_SCALE,
    payload,
  };
};

export const setCurrentTown = payload => {
  return {
    type: actionTypesMapInfos.SET_CURRENT_TOWN,
    payload,
  };
};

export const setCurrentQuest = payload => {
  return {
    type: actionTypesMapInfos.SET_CURRENT_QUEST,
    payload,
  };
};

export const showQuest = payload => {
  return {
    type: actionTypesMapInfos.SHOW_QUEST,
    payload,
  };
};

export const hideQuest = () => {
  return {
    type: actionTypesMapInfos.HIDE_QUEST,
  };
};

export const setCurrentTile = payload => {
  return {
    type: actionTypesMapInfos.SET_CURRENT_TILE,
    payload,
  };
};

export const setTextureToApply = payload => {
  return {
    type: actionTypesMapInfos.SET_TEXTURE_TO_APPLY,
    payload,
  };
};

export const setAllTowns = payload => {
  return {
    type: actionTypesMapInfos.SET_ALL_TOWNS,
    payload,
  };
};

export const setAllQuests = payload => {
  return {
    type: actionTypesMapInfos.SET_ALL_QUESTS,
    payload,
  };
};
