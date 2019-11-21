import { delay } from "redux-saga";
import { call, put, select, takeLatest } from "redux-saga/effects";

import * as actionsTypesSounds from "../actionsTypes/actionsTypesSounds";
import * as actionsSounds from "../actions/actionsSounds";
import * as actionsAppState from "../actions/actionsAppState";
import { currentStorySelector } from "../../selectors";
import { getTranslations } from "../../i18n";
import { firebaseDbSet } from "./api";

function* soundsError(error = getTranslations("error.transfer.failed")) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(""));
}

export function* callResetSounds() {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory > -1) {
      firebaseDbSet("/stories/" + currentStory + "/music", {
        musicVolume: 50,
        musicNameFirst: "",
        musicVolumeFirst: 0,
        musicNameSecond: "",
        musicVolumeSecond: 0,
        musicStatusFirst: "STOPPED",
        musicStatusSecond: "STOPPED",
      }).catch(error => {
        console.log("callResetSounds saga err:", { error });
      });

      firebaseDbSet("/stories/" + currentStory + "/noise", {
        noiseName: "",
        noiseVolume: 50,
        noiseStatus: "STOPPED",
      }).catch(error => {
        console.log("callResetSounds set saga err:", { error });
      });

      yield call(actionsSounds.toggleMusicFirst, true);
    } else {
      yield call(soundsError, "No story selected");
    }
  } catch (error) {
    console.log("callResetSounds try saga err:", { error });

    yield call(soundsError);
  }

  return null;
}

export function* watchCallResetSounds() {
  yield takeLatest(actionsTypesSounds.CALL_RESET_SOUNDS, callResetSounds);
}

export function* callStopNoise() {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory > -1) {
      firebaseDbSet("/stories/" + currentStory + "/noise", {
        noiseStatus: "STOPPED",
        noiseName: "",
      }).catch(error => {
        console.log("callStopNoise set saga err:", { error });
      });
      yield call(actionsSounds.stopNoise);
    } else {
      yield call(soundsError, "No story selected");
    }
  } catch (error) {
    console.log("callStopNoise try saga err:", { error });

    yield call(soundsError);
  }

  return null;
}

export function* watchCallStopNoise() {
  yield takeLatest(actionsTypesSounds.CALL_STOP_NOISE, callStopNoise);
}

export function* callStopSong() {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory > -1) {
      firebaseDbSet("/stories/" + currentStory + "/song", {
        songStatus: "STOPPED",
        songName: "",
      }).catch(error => {
        console.log("callStopSong set saga err:", { error });
      });
      yield call(actionsSounds.stopSong);
    } else {
      yield call(soundsError, "No story selected");
    }
  } catch (error) {
    console.log("callStopSong try saga err:", { error });

    yield call(soundsError);
  }

  return null;
}

export function* watchCallStopSong() {
  yield takeLatest(actionsTypesSounds.CALL_STOP_SONG, callStopSong);
}
