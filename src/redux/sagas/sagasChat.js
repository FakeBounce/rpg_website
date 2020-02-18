import {
  call,
  delay,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import * as actionsTypesChat from "../actionsTypes/actionsTypesChat";
import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";
import * as actionsChat from "../actions/actionsChat";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { currentStorySelector } from "../../selectors";
import firebase from "firebase";

function* chatError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

function chatHistoryChannel(currentStory) {
  const ref = firebase
    .database()
    .ref("/stories/" + currentStory + "/chat")
    .limitToLast(50);

  return eventChannel(emit => {
    const callback = ref.on("child_added", snapshot => {
      emit({ [snapshot.key]: snapshot.val() });
    });

    // unsubscribe function
    return () => ref.off("child_added", callback);
  });
}

function* listenChatHistory() {
  const currentStory = yield select(currentStorySelector);
  const channel = yield call(chatHistoryChannel, currentStory);

  yield takeEvery(channel, function*(data) {
    yield put(actionsChat.setChatHistory(data));
  });

  yield take([
    actionsTypesAppState.CANCEL_ALL_WATCH,
    actionsTypesAppState.RESET_APP,
  ]);
  channel.close();
}

export function* watchCallListenChatHistory() {
  yield takeLatest(
    actionsTypesChat.CALL_LISTEN_CHAT_HISTORY,
    listenChatHistory,
  );
}