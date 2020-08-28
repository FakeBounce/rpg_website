import {
  put,
  delay,
  takeLatest,
  take,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';

import * as actionsTypesAppState from '../actionsTypes/actionsTypesAppState';
import * as actionsAppState from '../actions/actionsAppState';
import * as actionsMapInfos from '../actions/actionsMapInfos';
import { getTranslations } from '../../i18n';
import { firebaseDbOnce, onValueChannel } from './api';

function* appStateError(
  { payload } = getTranslations('error.transfer.failed'),
) {
  yield put(actionsAppState.printError(payload));

  yield delay(5000);
  yield put(actionsAppState.printError(''));
}

export function* watchCallPrintError() {
  yield takeLatest(actionsTypesAppState.CALL_PRINT_ERROR, appStateError);
}

function* signOut() {
  try {
    const tilesTypes = yield call(firebaseDbOnce, '/tilesTypes');
    yield put(actionsAppState.resetApp());
    yield delay(3000);
    yield call(actionsMapInfos.setTilesTypes, tilesTypes);
  } catch (error) {
    console.log('signOut try saga err:', { error });

    yield call(appStateError, { payload: 'Could not sign out' });
  }

  return null;
}

export function* watchCallSignOut() {
  yield takeLatest(actionsTypesAppState.CALL_SIGN_OUT, signOut);
}

function* getStories() {
  try {
    const stories = yield call(firebaseDbOnce, '/stories');
    yield put(actionsAppState.setAllStories(stories));
  } catch (error) {
    console.log('getStories try saga err:', { error });

    yield call(appStateError, { payload: 'Could not get stories' });
  }

  return null;
}

export function* watchCallGetStories() {
  yield takeLatest(actionsTypesAppState.CALL_GET_ALL_STORIES, getStories);
}

export function* listenStoryUser(userId) {
  const channel = yield call(onValueChannel, `/users/${userId}`);

  let tempUserData = {};
  yield takeEvery(channel, function*(data) {
    tempUserData = { ...tempUserData, [userId]: data };
  });

  yield put(actionsAppState.setStoryUsers(tempUserData));

  yield take([
    actionsTypesAppState.CANCEL_ALL_WATCH,
    actionsTypesAppState.RESET_APP,
  ]);
  channel.close();
}

function* listenStoryUsers({ payload }) {
  if (payload && payload.length > 0) {
    yield all(payload.map(userId => call(listenStoryUser, userId)));
  }
}

export function* watchCallListenStoryUsers() {
  yield takeLatest(
    actionsTypesAppState.CALL_LISTEN_STORY_USERS,
    listenStoryUsers,
  );
}
