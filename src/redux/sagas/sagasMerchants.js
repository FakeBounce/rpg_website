import {
  call,
  put,
  delay,
  takeEvery,
  take,
  select,
  takeLatest,
} from "redux-saga/effects";

import * as actionsTypesMerchants from "../actionsTypes/actionsTypesMerchants";
import * as actionsMerchants from "../actions/actionsMerchants";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { firebaseDbOnce, onValueChannel } from "./api";
import { currentStorySelector } from "../../selectors";
import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";

function* merchantsError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));
  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

export function* getMerchantList() {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory > -1) {
      const merchantList = yield call(
        firebaseDbOnce,
        "stories/" + currentStory + "/merchants",
      );
      yield call(actionsMerchants.setMerchantList, merchantList);
    } else {
      yield call(merchantsError, "No storry selected");
    }
  } catch (error) {
    console.log("callSetUserPseudo try saga err:", { error });

    yield call(merchantsError);
  }

  return null;
}

export function* watchCallGetMerchantList() {
  yield takeLatest(
    actionsTypesMerchants.CALL_GET_MERCHANT_LIST,
    getMerchantList,
  );
}

function* listenMerchantList() {
  try {
    const currentStory = yield select(currentStorySelector);
    const channel = yield call(
      onValueChannel,
      "stories/" + currentStory + "/merchants",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsMerchants.setMerchantList(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenMerchantList try saga err:", { error });

    yield call(merchantsError);
  }
}

export function* watchCallListenMerchantList() {
  yield takeLatest(
    actionsTypesMerchants.CALL_LISTEN_MERCHANT_LIST,
    listenMerchantList,
  );
}
