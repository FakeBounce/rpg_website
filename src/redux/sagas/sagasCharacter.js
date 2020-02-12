import { call, put, select, delay, takeLatest } from "redux-saga/effects";

import * as actionsTypesCharacter from "../actionsTypes/actionsTypesCharacter";
import * as actionsCharacter from "../actions/actionsCharacter";
import * as actionsAppState from "../actions/actionsAppState";
import { getTranslations } from "../../i18n";
import { currentStorySelector, currentUidSelector } from "../../selectors";
import { firebaseDbSet } from "./api";

function* characterError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

export function* callSetCharacter(params) {
  try {
    const currentStory = yield select(currentStorySelector);
    const currentUid = yield select(currentUidSelector);
    if (currentStory > -1) {
      firebaseDbSet(
        "stories/" + currentStory + "/characters/" + currentUid + "/character",
        params,
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
