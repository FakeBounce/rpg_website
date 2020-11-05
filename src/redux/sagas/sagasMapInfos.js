import {
  call,
  put,
  delay,
  takeLatest,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";

import * as actionsTypesMapInfos from "../actionsTypes/actionsTypesMapInfos";
import * as actionsMapInfos from "../actions/actionsMapInfos";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { firebaseDbOnce, onValueChannel } from "./api";
import { currentStorySelector, storiesSelector } from "../../selectors";
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
      yield put(actionsMapInfos.setTilesTypes(result));
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
    actionsTypesMapInfos.CALL_GET_TILES_TYPES,
    callSetTilesTypes,
  );
}

function* listenMapTiles() {
  const currentStory = yield select(currentStorySelector);
  const stories = yield select(storiesSelector);
  try {
    const channel = yield call(
      onValueChannel,
      "/maps/" + stories[currentStory].map,
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsMapInfos.setMapTiles(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenMapTiles try saga err:", { error });

    yield call(mapInfosError);
  }
}

export function* watchCallListenMapTiles() {
  yield takeLatest(actionsTypesMapInfos.CALL_LISTEN_MAP_TILES, listenMapTiles);
}

function* listenCurrentX() {
  const currentStory = yield select(currentStorySelector);
  try {
    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/currentX",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsMapInfos.setCurrentX(data));
      yield put(actionsMapInfos.setCurrentZoom(10));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenCurrentX try saga err:", { error });

    yield call(mapInfosError);
  }
}

export function* watchCallListenCurrentX() {
  yield takeLatest(actionsTypesMapInfos.CALL_LISTEN_CURRENT_X, listenCurrentX);
}

function* listenCurrentY() {
  const currentStory = yield select(currentStorySelector);
  try {
    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/currentY",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsMapInfos.setCurrentY(data));
      yield put(actionsMapInfos.setCurrentZoom(10));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenCurrentY try saga err:", { error });

    yield call(mapInfosError);
  }
}

export function* watchCallListenCurrentY() {
  yield takeLatest(actionsTypesMapInfos.CALL_LISTEN_CURRENT_Y, listenCurrentY);
}

function* getCurrentPosition() {
  const currentStory = yield select(currentStorySelector);
  try {
    if (currentStory !== "") {
      const currentY = yield call(
        firebaseDbOnce,
        "stories/" + currentStory + "/currentY",
      );
      const currentX = yield call(
        firebaseDbOnce,
        "stories/" + currentStory + "/currentX",
      );
      yield put(
        actionsMapInfos.setCurrentPosition({
          currentX,
          currentY,
          currentZoom: 10,
        }),
      );
      // yield call(actionsCharacter.setCharacter, params); // useless cause we have a listener
    } else {
      yield call(mapInfosError, "No story selected");
    }
  } catch (error) {
    console.log("getCurrentPosition try saga err:", { error });

    yield call(mapInfosError);
  }
}

export function* watchCallGetCurrentPosition() {
  yield takeLatest(
    actionsTypesMapInfos.GET_CURRENT_POSITION,
    getCurrentPosition,
  );
}

function* listenAllTowns() {
  const currentStory = yield select(currentStorySelector);
  try {
    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/towns",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsMapInfos.setAllTowns(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenAllTowns try saga err:", { error });

    yield call(mapInfosError);
  }
}

export function* watchCallListenAllTowns() {
  yield takeLatest(actionsTypesMapInfos.CALL_LISTEN_ALL_TOWNS, listenAllTowns);
}

function* listenAllQuests() {
  const currentStory = yield select(currentStorySelector);
  try {
    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/quests",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsMapInfos.setAllQuests(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenAllTowns try saga err:", { error });

    yield call(mapInfosError);
  }
}

export function* watchCallListenAllQuests() {
  yield takeLatest(
    actionsTypesMapInfos.CALL_LISTEN_ALL_QUESTS,
    listenAllQuests,
  );
}
