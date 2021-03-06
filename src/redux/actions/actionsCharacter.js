import * as actionsTypesCharacter from '../actionsTypes/actionsTypesCharacter';

export const setCharacter = payload => {
  return {
    type: actionsTypesCharacter.SET_CHARACTER,
    payload,
  };
};

export const callListenCharacter = () => {
  return {
    type: actionsTypesCharacter.CALL_LISTEN_CHARACTER,
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

export const cancelListenCharacter = () => {
  return {
    type: actionsTypesCharacter.CANCEL_LISTEN_CHARACTER,
  };
};
