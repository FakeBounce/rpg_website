import {
  call,
  put,
  select,
  delay,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import * as actionsTypesItems from "../actionsTypes/actionsTypesItems";
import * as actionsItems from "../actions/actionsItems";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { firebaseDbOnce, onValueChannel } from "./api";
import { currentStorySelector } from "../../selectors";
import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";

function* itemsError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

function* getItems() {
  try {
    const data = yield call(firebaseDbOnce, "items");
    yield put(actionsItems.setItemList(data));
    yield put(actionsItems.callListenArtefactList());
  } catch (error) {
    console.log("getCurrentPosition try saga err:", { error });

    yield call(itemsError);
  }
}

export function* watchCallGetItemList() {
  yield takeLatest(actionsTypesItems.CALL_GET_ITEM_LIST, getItems);
}

function* listenArtefactList() {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory > -1) {
      const channel = yield call(
        onValueChannel,
        "/stories/" + currentStory + "/artefacts",
      );

      yield takeEvery(channel, function*(data) {
        yield put(actionsItems.setArtefactList(data));
      });

      yield take([
        actionsTypesAppState.CANCEL_ALL_WATCH,
        actionsTypesAppState.RESET_APP,
      ]);
      channel.close();
    } else {
      yield call(itemsError, "No story selected");
    }
  } catch (error) {
    console.log("listenAllTowns try saga err:", { error });

    yield call(itemsError);
  }
}

export function* watchCallListenArtefactList() {
  yield takeLatest(
    actionsTypesItems.CALL_LISTEN_ARTEFACT_LIST,
    listenArtefactList,
  );
}
