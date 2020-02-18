import {
  put,
  delay,
  takeLatest,
  take,
  takeEvery,
  call,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";
import * as actionsAppState from "../actions/actionsAppState";
import * as actionsMapInfos from "../actions/actionsMapInfos";
import { getTranslations } from "../../i18n";
import { firebaseDbOnce, onValueChannel } from "./api";
import firebase from "firebase";

function* appStateError(
  { payload } = getTranslations("error.transfer.failed"),
) {
  yield put(actionsAppState.printError(payload));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

export function* watchCallPrintError() {
  yield takeLatest(actionsTypesAppState.CALL_PRINT_ERROR, appStateError);
}

function* signOut() {
  try {
    const tilesTypes = yield call(firebaseDbOnce, "/tilesTypes");
    yield put(actionsAppState.resetApp());
    yield delay(3000);
    yield call(actionsMapInfos.setTilesTypes, tilesTypes);
  } catch (error) {
    console.log("signOut try saga err:", { error });

    yield call(appStateError, { payload: "Could not sign out" });
  }

  return null;
}

export function* watchCallSignOut() {
  yield takeLatest(actionsTypesAppState.CALL_SIGN_OUT, signOut);
}

function* getStories() {
  try {
    const stories = yield call(firebaseDbOnce, "/stories");
    yield put(actionsAppState.setAllStories(stories));
  } catch (error) {
    console.log("getStories try saga err:", { error });

    yield call(appStateError, { payload: "Could not get stories" });
  }

  return null;
}

export function* watchCallGetStories() {
  yield takeLatest(actionsTypesAppState.CALL_GET_ALL_STORIES, getStories);
}

function* listenStoryUsers() {
  const channel = yield call(onValueChannel, "/users");

  yield takeEvery(channel, function*(data) {
    yield put(actionsAppState.setStoryUsers(data));
  });

  yield take([
    actionsTypesAppState.CANCEL_ALL_WATCH,
    actionsTypesAppState.RESET_APP,
  ]);
  channel.close();
}

export function* watchCallListenStoryUsers() {
  yield takeLatest(
    actionsTypesAppState.CALL_LISTEN_STORY_USERS,
    listenStoryUsers,
  );
}
