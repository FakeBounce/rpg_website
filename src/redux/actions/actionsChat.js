import * as actionTypesChat from "../actionsTypes/actionsTypesChat";

export const setChatHistory = payload => {
  return {
    type: actionTypesChat.SET_CHAT_HISTORY,
    payload,
  };
};
