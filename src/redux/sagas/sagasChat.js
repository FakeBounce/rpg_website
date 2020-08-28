import {
  call,
  // delay,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import * as actionsTypesChat from '../actionsTypes/actionsTypesChat';
import * as actionsTypesAppState from '../actionsTypes/actionsTypesAppState';
import * as actionsChat from '../actions/actionsChat';
// import * as actionsAppState from "../actions/actionsAppState";
// import { getTranslations } from "../../i18n";
import { currentStorySelector } from '../../selectors';
import firebase from 'firebase';
import { eventChannel } from 'redux-saga';

// function* chatError(error = getTranslations("error.transfer.failed")) {
//   yield put(actionsAppState.printError(error));
//
//   yield delay(5000);
//   yield put(actionsAppState.printError(""));
// }

function chatHistoryChannel(path) {
  const ref = firebase.database().ref(path);

  return eventChannel(emit => {
    const callback = ref.on('child_added', snapshot => {
      emit({ [snapshot.key]: snapshot.val() });
    });

    // unsubscribe function
    return () => ref.off('child_added', callback);
  });
}

function getChatHistory(path) {
  const ref = firebase.database().ref(path);

  return ref
    .limitToLast(50)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
}

function* listenChatHistory() {
  const currentStory = yield select(currentStorySelector);
  const channel = yield call(
    chatHistoryChannel,
    '/stories/' + currentStory + '/chat',
  );
  const request = yield call(
    getChatHistory,
    '/stories/' + currentStory + '/chat',
  );
  yield put(actionsChat.setChatHistory(request));

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
