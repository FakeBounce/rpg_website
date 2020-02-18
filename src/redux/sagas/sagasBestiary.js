import {
  call,
  put,
  select,
  delay,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import * as actionsTypesBestiary from "../actionsTypes/actionsTypesBestiary";
import * as actionsBestiary from "../actions/actionsBestiary";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { currentStorySelector } from "../../selectors";
import { onValueChannel } from "./api";
import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";

function* bestiaryError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

function* listenBestiary() {
  try {
    const currentStory = yield select(currentStorySelector);
    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/bestiary",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsBestiary.setBestiaryList(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenBestiary try saga err:", { error });

    yield call(bestiaryError);
  }
}

export function* watchCallListenBestiary() {
  yield takeLatest(actionsTypesBestiary.CALL_LISTEN_BESTIARY, listenBestiary);
}
