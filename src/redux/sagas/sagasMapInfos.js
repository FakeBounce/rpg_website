import {
  call,
  put,
  delay,
  takeLatest,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import firebase from "firebase";

import * as actionsTypesMapInfos from "../actionsTypes/actionsTypesMapInfos";
import * as actionsMapInfos from "../actions/actionsMapInfos";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { firebaseDbOnce } from "./api";
import { currentStorySelector, storiesSelector } from "../../selectors";
import { eventChannel } from "redux-saga";
import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";

function* mapInfosError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

export function* callSetTilesTypes() {
  try {
    const result = yield call(firebaseDbOnce, "/tilesTypes", "value");
    if (result) {
      yield call(actionsMapInfos.setTilesTypes, result);
    } else {
      yield call(mapInfosError, "No result for map tiles");
    }
  } catch (error) {
    console.log("callSetTilesTypes try saga err:", { error });

    yield call(mapInfosError);
  }

  return null;
}

export function* watchCallSetTilesTypes() {
  yield takeLatest(
    actionsTypesMapInfos.CALL_SET_TILES_TYPES,
    callSetTilesTypes,
  );
}

function mapTilesChannel(mapName) {
  const ref = firebase.database().ref("/maps/" + mapName);

  return eventChannel(emit => {
    const callback = ref.on("value", snapshot => {
      emit(snapshot.val());
    });

    // unsubscribe function
    return () => ref.off("value", callback);
  });
}

function* listenMapTiles() {
  const currentStory = yield select(currentStorySelector);
  const stories = yield select(storiesSelector);
  const channel = yield call(mapTilesChannel, stories[currentStory].map);

  yield takeEvery(channel, function*(data) {
    yield put(actionsMapInfos.setMapTiles(data));
  });

  yield take([
    actionsTypesAppState.CANCEL_ALL_WATCH,
    actionsTypesAppState.RESET_APP,
  ]);
  channel.close();
}

export function* watchCallListenMapTiles() {
  yield takeLatest(actionsTypesMapInfos.CALL_LISTEN_MAP_TILES, listenMapTiles);
}
