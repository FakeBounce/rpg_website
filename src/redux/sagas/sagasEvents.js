import {
  call,
  put,
  select,
  delay,
  takeLatest,
  take,
  takeEvery,
} from "redux-saga/effects";

import * as actionsTypesEvents from "../actionsTypes/actionsTypesEvents";
import * as actionsEvents from "../actions/actionsEvents";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { currentStorySelector } from "../../selectors";
import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";
import { onValueChannel } from "./api";

function* eventsError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

function* listenCurrentEvent() {
  const currentStory = yield select(currentStorySelector);
  const channel = yield call(
    onValueChannel,
    "/stories/" + currentStory + "/currentEvent",
  );

  yield takeEvery(channel, function*(data) {
    yield put(actionsEvents.setCurrentEvent(data));
  });

  yield take([
    actionsTypesAppState.CANCEL_ALL_WATCH,
    actionsTypesAppState.RESET_APP,
  ]);
  channel.close();
}
export function* watchCallListenCurrentEvent() {
  yield takeLatest(
    actionsTypesEvents.CALL_LISTEN_CURRENT_EVENT,
    listenCurrentEvent,
  );
}

function* listenHistoryEvents() {
  const currentStory = yield select(currentStorySelector);
  const channel = yield call(
    onValueChannel,
    "/stories/" + currentStory + "/events",
  );

  yield takeEvery(channel, function*(data) {
    yield put(actionsEvents.setEventsHistory(data));
  });

  yield take([
    actionsTypesAppState.CANCEL_ALL_WATCH,
    actionsTypesAppState.RESET_APP,
  ]);
  channel.close();
}
export function* watchCallListenHistoryEvents() {
  yield takeLatest(
    actionsTypesEvents.CALL_LISTEN_EVENTS_HISTORY,
    listenHistoryEvents,
  );
}
