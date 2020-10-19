import { call, put, delay, takeLatest, select } from 'redux-saga/effects';
import firebase from 'firebase';

import * as actionsTypesUserInfos from '../actionsTypes/actionsTypesUserInfos';
import * as actionsUserInfos from '../actions/actionsUserInfos';
import * as actionsAppState from '../actions/actionsAppState';
import { getTranslations } from '../../i18n';
import { firebaseDbSet, firebaseDbOnce } from './api';
import { currentUidSelector } from '../../selectors';

function* userInfosError(error = getTranslations('error.transfer.failed')) {
  yield put(actionsAppState.printError(error));
  yield delay(5000);
  yield put(actionsAppState.printError(''));
}

export function* callSetUserPseudo(pseudo) {
  try {
    if (firebase.auth().currentUser.uid) {
      firebaseDbSet(
        'users/' + firebase.auth().currentUser.uid + '/pseudo',
        pseudo,
      ).catch(error => {
        console.log('callLoadNoise set saga err:', { error });
      });
      yield call(actionsUserInfos.setUserPseudo, pseudo);
    } else {
      yield call(userInfosError, 'No user authenticated');
    }
  } catch (error) {
    console.log('callSetUserPseudo try saga err:', { error });

    yield call(userInfosError);
  }

  return null;
}

export function* watchCallSetUserPseudo() {
  yield takeLatest(
    actionsTypesUserInfos.CALL_SET_USER_PSEUDO,
    callSetUserPseudo,
  );
}

export function* getAllUserCharacters() {
  try {
    const currentUid = yield select(currentUidSelector);
    if (firebase.auth().currentUser.uid) {
      const allCharacters = yield call(
        firebaseDbOnce,
        `/users/${currentUid}/characters`,
      );
      yield call(actionsUserInfos.setAllCharacters, allCharacters);
    } else {
      yield call(userInfosError, 'No user authenticated');
    }
  } catch (error) {
    console.log('callSetUserPseudo try saga err:', { error });

    yield call(userInfosError);
  }

  return null;
}

export function* watchCallGetAllUserCharacters() {
  yield takeLatest(
    actionsTypesUserInfos.CALL_GET_ALL_USER_CHARACTERS,
    getAllUserCharacters,
  );
}
