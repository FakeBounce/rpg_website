import * as actionsTypesItems from "../actionsTypes/actionsTypesItems";

export const setItemList = payload => {
  return {
    type: actionsTypesItems.SET_ITEM_LIST,
    payload,
  };
};
export const setArtefactList = payload => {
  return {
    type: actionsTypesItems.SET_ARTEFACT_LIST,
    payload,
  };
};

export const callListenArtefactList = () => {
  return {
    type: actionsTypesItems.CALL_LISTEN_ARTEFACT_LIST,
  };
};
