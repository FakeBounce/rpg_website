import { spawn } from "redux-saga/effects";

import * as sagasSounds from "./sagasSounds";

function* rootSaga() {
  yield spawn(sagasSounds.watchCallResetSounds);
  yield spawn(sagasSounds.watchCallStopNoise);
  yield spawn(sagasSounds.watchCallStopSong);
}

export default rootSaga;
