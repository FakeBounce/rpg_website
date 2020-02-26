import * as actionsTypesCharacter from "../actionsTypes/actionsTypesCharacter";

export const setCharacter = payload => {
  return {
    type: actionsTypesCharacter.SET_CHARACTER,
    payload,
  };
};

export const callSetCharacter = payload => {
  return {
    type: actionsTypesCharacter.CALL_SET_CHARACTER,
    payload,
  };
};

export const callListenOtherCharacter = payload => {
  return {
    type: actionsTypesCharacter.CALL_LISTEN_OTHER_CHARACTER,
    payload,
  };
};
