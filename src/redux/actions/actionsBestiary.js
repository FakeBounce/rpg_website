import * as actionsTypesBestiary from "../actionsTypes/actionsTypesBestiary";

export const setBestiaryList = payload => {
  return {
    type: actionsTypesBestiary.SET_BESTIARY_LIST,
    payload,
  };
};
