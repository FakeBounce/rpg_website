import {
  call,
  put,
  select,
  delay,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import * as actionsTypesTeam from '../actionsTypes/actionsTypesTeam';
import * as actionsTeam from '../actions/actionsTeam';
import * as actionsAppState from '../actions/actionsAppState';
import { getTranslations } from '../../i18n';
import { currentStorySelector, currentStoryUsers } from '../../selectors';
import { onValueChannel } from './api';
import * as actionsTypesAppState from '../actionsTypes/actionsTypesAppState';

function* teamError(error = getTranslations('error.transfer.failed')) {
  yield put(actionsAppState.printError(error));
  yield delay(5000);
  yield put(actionsAppState.printError(''));
}

function* listenTeam() {
  try {
    const currentStory = yield select(currentStorySelector);
    const channel = yield call(
      onValueChannel,
      '/stories/' + currentStory + '/characters',
    );

    yield takeEvery(channel, function*(data) {
      const currentUsers = yield select(currentStoryUsers);
      const charactersFromStories = [];
      const usersFromStories = [];
      if (typeof data !== 'undefined' && data) {
        Object.keys(data).map(key => {
          charactersFromStories.push(data[key].character);
          usersFromStories.push(key);
          return null;
        });
      }
      yield put(actionsTeam.setTeamCharacters(charactersFromStories));
      if (Object.keys(currentUsers).length !== usersFromStories.length) {
        yield put(actionsAppState.callListenStoryUsers(usersFromStories));
      }
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log('listenTeam try saga err:', { error });

    yield call(teamError);
  }
}

export function* watchCallListenTeam() {
  yield takeLatest(actionsTypesTeam.CALL_LISTEN_TEAM_CHARACTERS, listenTeam);
}
