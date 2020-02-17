import { spawn } from "redux-saga/effects";

import * as sagasAppState from "./sagasAppState";
import * as sagasCharacter from "./sagasCharacter";
import * as sagasChat from "./sagasChat";
import * as sagasEvents from "./sagasEvents";
import * as sagasMapInfos from "./sagasMapInfos";
import * as sagasMerchants from "./sagasMerchants";
import * as sagasUserInfos from "./sagasUserInfos";
import * as sagasSounds from "./sagasSounds";

function* rootSaga() {
  // App state
  yield spawn(sagasAppState.watchCallPrintError);
  yield spawn(sagasAppState.watchCallGetStories);
  yield spawn(sagasAppState.watchCallListenStoryUsers);
  yield spawn(sagasAppState.watchCallSignOut);
  // Chat
  yield spawn(sagasChat.watchCallListenChatHistory);
  // Character
  yield spawn(sagasCharacter.watchCallSetCharacter);
  // Events
  yield spawn(sagasEvents.watchCallListenCurrentEvent);
  yield spawn(sagasEvents.watchCallListenHistoryEvents);
  // Map infos
  yield spawn(sagasMapInfos.watchCallSetTilesTypes);
  yield spawn(sagasMapInfos.watchCallListenMapTiles);
  yield spawn(sagasMapInfos.watchCallListenCurrentX);
  yield spawn(sagasMapInfos.watchCallListenCurrentY);
  yield spawn(sagasMapInfos.watchCallGetCurrentPosition);
  // Merchants
  yield spawn(sagasMerchants.watchCallGetMerchantList);
  yield spawn(sagasMerchants.watchCallListenMerchantList);
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
