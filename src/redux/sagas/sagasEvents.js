import {
  call,
  put,
  select,
  delay,
  takeLatest,
  take,
  takeEvery,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import * as actionsTypesEvents from "../actionsTypes/actionsTypesEvents";
import * as actionsEvents from "../actions/actionsEvents";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { currentStorySelector } from "../../selectors";
import firebase from "firebase";
import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";

function* eventsError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

function currentEventChannel(currentStory) {
  const ref = firebase
    .database()
    .ref("/stories/" + currentStory + "/currentEvent");

  return eventChannel(emit => {
    const callback = ref.on("value", snapshot => {
      emit(snapshot.val());
    });

    // unsubscribe function
    return () => ref.off("value", callback);
  });
}

function* listenCurrentEvent() {
  const currentStory = yield select(currentStorySelector);
  const channel = yield call(currentEventChannel, currentStory);

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
