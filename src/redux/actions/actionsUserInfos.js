import * as actionsTypesUserInfos from "../actionsTypes/actionsTypesUserInfos";

export const setUid = payload => {
  return {
    type: actionsTypesUserInfos.SET_UID,
    payload,
  };
};

export const setUserPseudo = payload => {
  return {
    type: actionsTypesUserInfos.SET_USER_PSEUDO,
    payload,
  };
};

export const callSetUserPseudo = payload => {
  return {
    type: actionsTypesUserInfos.CALL_SET_USER_PSEUDO,
    payload,
  };
};
