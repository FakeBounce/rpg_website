import {
  call,
  put,
  select,
  delay,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import * as actionsTypesCharacter from '../actionsTypes/actionsTypesCharacter';
import * as actionsCharacter from '../actions/actionsCharacter';
import * as actionsAppState from '../actions/actionsAppState';
import * as actionsUserInfos from '../actions/actionsUserInfos';
import { getTranslations } from '../../i18n';
import { currentStorySelector, currentUidSelector } from '../../selectors';
import {
  firebaseDbOnce,
  firebaseDbSet,
  onValueChannel,
  firebaseDbNewKey,
  storageTempReplacing,
} from './api';
import * as actionsTypesAppState from '../actionsTypes/actionsTypesAppState';
import { setCharacter } from '../actions/actionsCharacter';

function* characterError(error = getTranslations('error.transfer.failed')) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(''));
}

export function* callSetCharacter({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    const currentUid = yield select(currentUidSelector);
    if (currentStory !== '') {
      firebaseDbSet(
        'stories/' + currentStory + '/characters/' + currentUid + '/character',
        payload,
      ).catch(error => {
        console.log('callLoadNoise set saga err:', { error });
      });
      // yield call(actionsCharacter.setCharacter, params); // useless cause we have a listener
    } else {
      yield call(characterError, 'No story selected');
    }
  } catch (error) {
    console.log('callSetUserPseudo try saga err:', { error });

    yield call(characterError);
  }

  return null;
}

export function* watchCallSetCharacter() {
  yield takeLatest(actionsTypesCharacter.CALL_SET_CHARACTER, callSetCharacter);
}

function* listenCharacter() {
  try {
    const currentStory = yield select(currentStorySelector);
    const currentUid = yield select(currentUidSelector);
    const channel = yield call(
      onValueChannel,
      '/stories/' + currentStory + '/characters/' + currentUid + '/character',
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsCharacter.setCharacter(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
      actionsTypesCharacter.CANCEL_LISTEN_CHARACTER,
    ]);
    channel.close();
  } catch (error) {
    console.log('listenCharacter try saga err:', { error });

    yield call(characterError);
  }
}

export function* watchCallListenCharacter() {
  yield takeLatest(
    actionsTypesCharacter.CALL_LISTEN_CHARACTER,
    listenCharacter,
  );
}

function* listenOtherCharacter({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    const newCharacter = yield call(
      firebaseDbOnce,
      '/stories/' + currentStory + '/characters/' + payload + '/character',
    );
    yield put(setCharacter(newCharacter));
    yield put(actionsTypesCharacter.CANCEL_LISTEN_CHARACTER);

    const channel = yield call(
      onValueChannel,
      '/stories/' + currentStory + '/characters/' + payload + '/character',
    );
    yield takeEvery(channel, function*(data) {
      yield put(actionsCharacter.setCharacter(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
      actionsTypesCharacter.CANCEL_LISTEN_CHARACTER,
    ]);
    channel.close();
  } catch (error) {
    console.log('listenCharacter try saga err:', { error });

    yield call(characterError);
  }
}

export function* watchCallListenOtherCharacter() {
  yield takeLatest(
    actionsTypesCharacter.CALL_LISTEN_OTHER_CHARACTER,
    listenOtherCharacter,
  );
}

function* selectOtherCharacter({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    const uid = yield select(currentUidSelector);

    console.log('payload', payload);
    firebaseDbSet(`stories/${currentStory}/characters/${uid}`, {
      character: payload.character,
      characterId: payload.characterId,
    }).catch(error => {
      console.log('selectOtherCharacter set saga err:', { error });
    });

    // Needed
    yield put(setCharacter(payload.character));
    yield put(actionsUserInfos.setCharacterId(payload.characterId));

    // Already listening
    // const channel = yield call(
    //   onValueChannel,
    //   '/stories/' + currentStory + '/characters/' + uid + '/character',
    // );
    // yield takeEvery(channel, function*(data) {
    //   yield put(actionsCharacter.setCharacter(data));
    // });

    // yield take([
    //   actionsTypesAppState.CANCEL_ALL_WATCH,
    //   actionsTypesAppState.RESET_APP,
    //   CANCEL_LISTEN_CHARACTER,
    // ]);
    // channel.close();
  } catch (error) {
    console.log('selectOtherCharacter try saga err:', { error });

    yield call(characterError);
  }
}

export function* watchCallSelectOtherCharacter() {
  yield takeLatest(
    actionsTypesCharacter.CALL_SELECT_OTHER_CHARACTER,
    selectOtherCharacter,
  );
}

function* updateCharacter({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    const uid = yield select(currentUidSelector);

    firebaseDbSet(`stories/${currentStory}/characters/${uid}`, {
      character: payload.charToRegister,
      characterId: payload.id,
    }).catch(error => {
      console.log('updateCharacter set saga err:', { error });
    });
  } catch (error) {
    console.log('updateCharacter try saga err:', { error });

    yield call(characterError);
  }
}

export function* watchUpdateCharacter() {
  yield takeLatest(actionsTypesCharacter.UPDATE_CHARACTER, updateCharacter);
}

function* createCharacter({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    const uid = yield select(currentUidSelector);

    const newCharKey = firebaseDbNewKey(`users/${uid}/characters`);

    firebaseDbSet(`users/${uid}/characters/${newCharKey}`, {
      character: payload.character,
      characterId: newCharKey,
    }).catch(error => {
      console.log('createCharacter set saga err:', { error });
    });

    firebaseDbSet(`stories/${currentStory}/characters/${uid}`, {
      character: payload.charForStory,
      characterId: newCharKey,
    }).catch(error => {
      console.log('createCharacter set saga err:', { error });
    });

    storageTempReplacing(uid, newCharKey, payload.picture);

    yield put(actionsTypesCharacter.CANCEL_LISTEN_CHARACTER);

    // usefull ? since we listen after
    // yield put(setCharacter(payload.charToRegister));

    yield put(
      actionsUserInfos.setupCharacterCreation({
        characterCreation: false,
        characterId: newCharKey,
      }),
    );

    const channel = yield call(
      onValueChannel,
      '/stories/' + currentStory + '/characters/' + uid + '/character',
    );
    yield takeEvery(channel, function*(data) {
      yield put(actionsCharacter.setCharacter(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
      actionsTypesCharacter.CANCEL_LISTEN_CHARACTER,
    ]);
    channel.close();
  } catch (error) {
    console.log('createCharacter try saga err:', { error });

    yield call(characterError);
  }
}

export function* watchCreateCharacter() {
  yield takeLatest(
    actionsTypesCharacter.CALL_CREATE_CHARACTER,
    createCharacter,
  );
}
