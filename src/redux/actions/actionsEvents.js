import * as actionTypesEvents from "../actionsTypes/actionsTypesEvents";

export const setCurrentEvent = payload => {
  return {
    type: actionTypesEvents.SET_CURRENT_EVENT,
    payload,
  };
};

export const setEventsHistory = payload => {
  return {
    type: actionTypesEvents.SET_EVENTS_HISTORY,
    payload,
  };
};
