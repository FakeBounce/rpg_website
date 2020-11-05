import { spawn } from 'redux-saga/effects';

import * as sagasAppState from './sagasAppState';
import * as sagasBestiary from './sagasBestiary';
import * as sagasCharacter from './sagasCharacter';
import * as sagasChat from './sagasChat';
import * as sagasEvents from './sagasEvents';
import * as sagasItems from './sagasItems';
import * as sagasMapInfos from './sagasMapInfos';
import * as sagasMerchants from './sagasMerchants';
import * as sagasTeam from './sagasTeam';
import * as sagasUserInfos from './sagasUserInfos';
import * as sagasSounds from './sagasSounds';

function* rootSaga() {
  // App state
  yield spawn(sagasAppState.watchCallPrintError);
  yield spawn(sagasAppState.watchCallGetStories);
  yield spawn(sagasAppState.watchCallListenStoryUsers);
  yield spawn(sagasAppState.watchCallSignOut);
  yield spawn(sagasAppState.watchCallCreateStory);
  // Bestiary
  yield spawn(sagasBestiary.watchCallListenBestiary);
  // Chat
  yield spawn(sagasChat.watchCallListenChatHistory);
  // Character
  yield spawn(sagasCharacter.watchCallSetCharacter);
  yield spawn(sagasCharacter.watchCallListenCharacter);
  yield spawn(sagasCharacter.watchCallListenOtherCharacter);
  yield spawn(sagasCharacter.watchCallSelectOtherCharacter);
  yield spawn(sagasCharacter.watchUpdateCharacter);
  yield spawn(sagasCharacter.watchCreateCharacter);
  yield spawn(sagasCharacter.watchDeleteCharacter);
  // Events
  yield spawn(sagasEvents.watchCallListenCurrentEvent);
  yield spawn(sagasEvents.watchCallListenHistoryEvents);
  yield spawn(sagasEvents.watchAddNewEvent);
  // Items
  yield spawn(sagasItems.watchCallGetItemList);
  yield spawn(sagasItems.watchCallListenArtefactList);
  // Map infos
  yield spawn(sagasMapInfos.watchCallSetTilesTypes);
  yield spawn(sagasMapInfos.watchCallListenMapTiles);
  yield spawn(sagasMapInfos.watchCallListenCurrentX);
  yield spawn(sagasMapInfos.watchCallListenCurrentY);
  yield spawn(sagasMapInfos.watchCallGetCurrentPosition);
  yield spawn(sagasMapInfos.watchCallListenAllTowns);
  yield spawn(sagasMapInfos.watchCallListenAllQuests);
  // Merchants
  yield spawn(sagasMerchants.watchCallGetMerchantList);
  yield spawn(sagasMerchants.watchCallListenMerchantList);

  // User infos
  yield spawn(sagasUserInfos.watchCallSetUserPseudo);
  yield spawn(sagasUserInfos.watchCallGetAllUserCharacters);
  // Team
  yield spawn(sagasTeam.watchCallListenTeam);
  // Sounds
  yield spawn(sagasSounds.watchCallResetSounds);
  yield spawn(sagasSounds.watchCallStopNoise);
  yield spawn(sagasSounds.watchCallStopSong);
  yield spawn(sagasSounds.watchCallLoadSong);
  yield spawn(sagasSounds.watchCallLoadMusic);
  yield spawn(sagasSounds.watchCallLoadNoise);
  yield spawn(sagasSounds.watchCallListenNoise);
  yield spawn(sagasSounds.watchCallListenMusic);
  yield spawn(sagasSounds.watchCallListenSong);
}

export default rootSaga;
