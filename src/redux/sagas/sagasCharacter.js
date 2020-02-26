import {
  call,
  put,
  select,
  delay,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import * as actionsTypesCharacter from "../actionsTypes/actionsTypesCharacter";
import * as actionsCharacter from "../actions/actionsCharacter";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { currentStorySelector, currentUidSelector } from "../../selectors";
import { firebaseDbOnce, firebaseDbSet, onValueChannel } from "./api";
import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";
import { setCharacter } from "../actions/actionsCharacter";

function* characterError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

export function* callSetCharacter({payload}) {
  try {
    const currentStory = yield select(currentStorySelector);
    const currentUid = yield select(currentUidSelector);
    if (currentStory > -1) {
      firebaseDbSet(
        "stories/" + currentStory + "/characters/" + currentUid + "/character",
        payload,
      ).catch(error => {
        console.log("callLoadNoise set saga err:", { error });
      });
      // yield call(actionsCharacter.setCharacter, params); // useless cause we have a listener
    } else {
      yield call(characterError, "No story selected");
    }
  } catch (error) {
    console.log("callSetUserPseudo try saga err:", { error });

    yield call(characterError);
  }

  return null;
}

export function* watchCallSetCharacter() {
  yield takeLatest(actionsTypesCharacter.CALL_SET_CHARACTER, callSetCharacter);
}

function* listenCharacter() {
  try {
    const currentStory = yield select(currentStorySelector);
    const currentUid = yield select(currentUidSelector);
    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/characters/" + currentUid + "/character",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsCharacter.setCharacter(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenCharacter try saga err:", { error });

    yield call(characterError);
  }
}

export function* watchCallListenCharacter() {
  yield takeLatest(
    actionsTypesCharacter.CALL_LISTEN_CHARACTER,
    listenCharacter,
  );
}

function* listenOtherCharacter({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    const newCharacter = yield call(
      firebaseDbOnce,
      "/stories/" + currentStory + "/characters/" + payload + "/character",
    );
    yield put(setCharacter(newCharacter));

    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/characters/" + payload + "/character",
    );
    console.log(
      "path",
      "/stories/" + currentStory + "/characters/" + payload + "/character",
    );
    yield takeEvery(channel, function*(data) {
      yield put(actionsCharacter.setCharacter(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenCharacter try saga err:", { error });

    yield call(characterError);
  }
}

export function* watchCallListenOtherCharacter() {
  yield takeLatest(
    actionsTypesCharacter.CALL_LISTEN_OTHER_CHARACTER,
    listenOtherCharacter,
  );
}
