import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";

export const printError = payload => {
  return {
    type: actionsTypesAppState.PRINT_ERROR,
    payload,
  };
};
