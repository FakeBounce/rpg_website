import { spawn } from "redux-saga/effects";

import * as sagasCharacter from "./sagasCharacter";
import * as sagasUserInfos from "./sagasUserInfos";
import * as sagasSounds from "./sagasSounds";

function* rootSaga() {
  // Character
  yield spawn(sagasCharacter.watchCallSetCharacter);
  // User infos
  yield spawn(sagasUserInfos.watchCallSetUserPseudo);
  // Sounds
  yield spawn(sagasSounds.watchCallResetSounds);
  yield spawn(sagasSounds.watchCallStopNoise);
  yield spawn(sagasSounds.watchCallStopSong);
  yield spawn(sagasSounds.watchCallLoadSong);
  yield spawn(sagasSounds.watchCallLoadMusic);
  yield spawn(sagasSounds.watchCallLoadNoise);
}

export default rootSaga;
