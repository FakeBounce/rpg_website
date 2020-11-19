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
import {
  currentStorySelector,
  currentUidSelector,
  currentPseudoSelector,
} from '../../selectors';
import {
  firebaseDbOnce,
  firebaseDbSet,
  onValueChannel,
  firebaseDbNewKey,
  storageTempReplacing,
  firebaseDbRemove,
} from './api';
import * as actionsTypesAppState from '../actionsTypes/actionsTypesAppState';

function* characterError(error = getTranslations('error.transfer.failed')) {
  yield put(actionsAppState.printError(error));

  yield delay(5000);
  yield put(actionsAppState.printError(''));
}

export function* callSetCharacter({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory !== '') {
      firebaseDbSet(
        'stories/' +
          currentStory +
          '/characters/' +
          payload.userUid +
          '/character',
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

    const characterId = yield call(
      firebaseDbOnce,
      `/stories/${currentStory}/characters/${currentUid}/characterId`,
    );

    yield put(actionsUserInfos.setCharacterId(characterId));

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
    yield put(actionsCharacter.setCharacter(newCharacter));
    yield put(actionsCharacter.cancelListenCharacter());

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
    console.log('listenOtherCharacter try saga err:', { error });

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
    const pseudo = yield select(currentPseudoSelector);

    firebaseDbSet(`stories/${currentStory}/characters/${uid}`, {
      character: {
        ...payload.character,
        status: 'OK',
        userPseudo: pseudo,
        userUid: uid,
      },
      characterId: payload.characterId,
    }).catch(error => {
      console.log('selectOtherCharacter set saga err:', { error });
    });

    // Needed
    yield put(actionsCharacter.setCharacter(payload.character));
    yield put(actionsUserInfos.setCharacterId(payload.characterId));

    yield put(
      actionsUserInfos.setupCharacterCreation({
        characterCreation: false,
        characterId: payload.characterId,
        oldCharacterId: '',
      }),
    );

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

    firebaseDbSet(`stories/${currentStory}/characters/${payload.userUid}`, {
      character: payload.character,
      characterId: payload.id,
    }).catch(error => {
      console.log('updateCharacter set saga err:', { error });
    });

    yield put(
      actionsUserInfos.setupCharacterCreation({
        characterCreation: false,
        characterId: payload.id,
        oldCharacterId: '',
      }),
    );
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
    const extension = payload.picture.name.split('.')[1] || '.png';
    const newFileName = `character_${newCharKey}.${extension}`;
    const newIconPath = `images/${uid}/${newFileName}`;
    const newIcon = payload.character.icon.replace(
      `temp_character.${extension}`,
      newFileName,
    );
    storageTempReplacing(uid, newCharKey, payload.picture);

    firebaseDbSet(`users/${uid}/characters/${newCharKey}`, {
      ...payload.character,
      iconPath: newIconPath,
      icon: newIcon,
      id: newCharKey,
    }).catch(error => {
      console.log('createCharacter set to user saga err:', { error });
    });

    firebaseDbSet(`stories/${currentStory}/characters/${uid}`, {
      character: {
        ...payload.charForStory,
        id: newCharKey,
        iconPath: newIconPath,
        icon: newIcon,
      },
      characterId: newCharKey,
    }).catch(error => {
      console.log('createCharacter set to story saga err:', { error });
    });

    yield put(actionsCharacter.setCharacter(payload.charForStory));

    yield put(
      actionsUserInfos.setupCharacterCreation({
        characterCreation: false,
        characterId: newCharKey,
        oldCharacterId: '',
      }),
    );
    yield put(actionsCharacter.callListenCharacter());

    yield put(actionsUserInfos.getAllCharacters());
  } catch (error) {
    console.log('createCharacter try  global saga err:', { error });

    yield call(characterError);
  }
}

export function* watchCreateCharacter() {
  yield takeLatest(
    actionsTypesCharacter.CALL_CREATE_CHARACTER,
    createCharacter,
  );
}

function* deleteCharacter({ payload }) {
  try {
    const uid = yield select(currentUidSelector);

    firebaseDbRemove(`users/${uid}/characters/${payload.id}`).catch(error => {
      console.log('deleteCharacter remove saga err:', { error });
    });

    yield put(actionsUserInfos.getAllCharacters());
  } catch (error) {
    console.log('createCharacter try  global saga err:', { error });

    yield call(characterError);
  }
}

export function* watchDeleteCharacter() {
  yield takeLatest(
    actionsTypesCharacter.CALL_DELETE_CHARACTER,
    deleteCharacter,
  );
}
