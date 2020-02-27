import {
  call,
  put,
  select,
  delay,
  takeLatest,
  takeEvery,
  take,
} from "redux-saga/effects";

import * as actionsTypesSounds from "../actionsTypes/actionsTypesSounds";
import * as actionsSounds from "../actions/actionsSounds";
import * as actionsAppState from "../actions/actionsAppState";
import { currentStorySelector, noiseSelector, songSelector } from "../../selectors";
import { getTranslations } from "../../i18n";
import { firebaseDbSet, onValueChannel } from "./api";
import * as actionsTypesAppState from "../actionsTypes/actionsTypesAppState";

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
        musicMute: false,
        musicNameFirst: "",
        musicNameSecond: "",
        musicStatusFirst: "STOPPED",
        musicStatusSecond: "STOPPED",
        musicVolume: 50,
        musicVolumeFirst: 50,
        musicVolumeSecond: 0,
        isMusicFirst: true,
        isMusicTransition: false,
      }).catch(error => {
        console.log("callResetSounds saga err:", { error });
      });

      firebaseDbSet("/stories/" + currentStory + "/noise", {
        noiseMute: false,
        noiseName: "",
        noiseStatus: "STOPPED",
        noiseVolume: 50,
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
    const noise = yield select(noiseSelector);
    if (currentStory > -1) {
      firebaseDbSet("/stories/" + currentStory + "/noise", {
        ...noise,
        noiseStatus: "STOPPED",
        noiseName: "",
      }).catch(error => {
        console.log("callStopNoise set saga err:", { error });
      });
      // yield call(actionsSounds.stopNoise);
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
    const song = yield select(songSelector);
    if (currentStory > -1) {
      firebaseDbSet("/stories/" + currentStory + "/song", {
        ...song,
        songName: "",
        songStatus: "STOPPED",
      }).catch(error => {
        console.log("callStopSong set saga err:", { error });
      });
      // yield call(actionsSounds.stopSong);
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

export function* callLoadSong({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory > -1) {
      firebaseDbSet("/stories/" + currentStory + "/song", {
        ...payload,
      }).catch(error => {
        console.log("callLoadSong set saga err:", { error });
      });

      // yield call(actionsSounds.loadSong, params);
    } else {
      yield call(soundsError, "No story selected");
    }
  } catch (error) {
    console.log("callLoadSong try saga err:", { error });
    yield call(soundsError);
  }

  return null;
}

export function* watchCallLoadSong() {
  yield takeLatest(actionsTypesSounds.CALL_LOAD_SONG, callLoadSong);
}

export function* callLoadMusic({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory > -1) {
      firebaseDbSet("/stories/" + currentStory + "/music", {
        ...payload,
      }).catch(error => {
        console.log("callLoadMusic set saga err:", { error });
      });
      // yield call(actionsSounds.loadMusic, params);
    } else {
      yield call(soundsError, "No story selected");
    }
  } catch (error) {
    console.log("callLoadMusic try saga err:", { error });

    yield call(soundsError);
  }

  return null;
}

export function* watchCallLoadMusic() {
  yield takeLatest(actionsTypesSounds.CALL_LOAD_MUSIC, callLoadMusic);
}

export function* callLoadNoise({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory > -1) {
      firebaseDbSet("/stories/" + currentStory + "/noise", {
        ...payload,
      }).catch(error => {
        console.log("callLoadNoise set saga err:", { error });
      });
      // yield call(actionsSounds.loadNoise, params); // useless because already listening
    } else {
      yield call(soundsError, "No story selected");
    }
  } catch (error) {
    console.log("callLoadNoise try saga err:", { error });

    yield call(soundsError);
  }

  return null;
}

export function* watchCallLoadNoise() {
  yield takeLatest(actionsTypesSounds.CALL_LOAD_NOISE, callLoadNoise);
}

function* listenMusic() {
  try {
    const currentStory = yield select(currentStorySelector);
    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/music",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsSounds.loadMusic(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenMusic try saga err:", { error });

    yield call(soundsError);
  }
}

export function* watchCallListenMusic() {
  yield takeLatest(actionsTypesSounds.CALL_LISTEN_MUSIC, listenMusic);
}

function* listenNoise() {
  try {
    const currentStory = yield select(currentStorySelector);
    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/noise",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsSounds.loadNoise(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenNoise try saga err:", { error });

    yield call(soundsError);
  }
}

export function* watchCallListenNoise() {
  yield takeLatest(actionsTypesSounds.CALL_LISTEN_NOISE, listenNoise);
}

function* listenSong() {
  try {
    const currentStory = yield select(currentStorySelector);
    const channel = yield call(
      onValueChannel,
      "/stories/" + currentStory + "/song",
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsSounds.loadSong(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log("listenSong try saga err:", { error });

    yield call(soundsError);
  }
}

export function* watchCallListenSong() {
  yield takeLatest(actionsTypesSounds.CALL_LISTEN_SONG, listenSong);
}
