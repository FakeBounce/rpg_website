import { spawn } from "redux-saga/effects";

import * as sagasSounds from "./sagasSounds";
import * as sagasUserInfos from "./sagasUserInfos";

function* rootSaga() {
  // Sounds
  yield spawn(sagasSounds.watchCallResetSounds);
  yield spawn(sagasSounds.watchCallStopNoise);
  yield spawn(sagasSounds.watchCallStopSong);
  yield spawn(sagasSounds.watchCallLoadSong);
  yield spawn(sagasSounds.watchCallLoadMusic);
  yield spawn(sagasSounds.watchCallLoadNoise);
  // User infos
  yield spawn(sagasUserInfos.watchCallSetUserPseudo);
}

export default rootSaga;
