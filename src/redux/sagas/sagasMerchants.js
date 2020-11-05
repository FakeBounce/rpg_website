import {
  call,
  put,
  delay,
  takeEvery,
  take,
  select,
  takeLatest,
} from 'redux-saga/effects';

import * as actionsTypesMerchants from '../actionsTypes/actionsTypesMerchants';
import * as actionsMerchants from '../actions/actionsMerchants';
import * as actionsAppState from '../actions/actionsAppState';
import { getTranslations } from '../../i18n';
import { firebaseDbOnce, onValueChannel, firebaseDbSet } from './api';
import {
  currentStorySelector,
  currentMerchantSelector,
  currentUidSelector,
  currentCharacterSelector,
} from '../../selectors';
import * as actionsTypesAppState from '../actionsTypes/actionsTypesAppState';

function* merchantsError(error = getTranslations('error.transfer.failed')) {
  yield put(actionsAppState.printError(error));
  yield delay(5000);
  yield put(actionsAppState.printError(''));
}

export function* getMerchantList() {
  try {
    const currentStory = yield select(currentStorySelector);
    if (currentStory !== "") {
      const merchantList = yield call(
        firebaseDbOnce,
        'stories/' + currentStory + '/merchants',
      );
      yield call(actionsMerchants.setMerchantList, merchantList);
    } else {
      yield call(merchantsError, 'No storry selected');
    }
  } catch (error) {
    console.log('callSetUserPseudo try saga err:', { error });

    yield call(merchantsError);
  }

  return null;
}

export function* watchCallGetMerchantList() {
  yield takeLatest(
    actionsTypesMerchants.CALL_GET_MERCHANT_LIST,
    getMerchantList,
  );
}

function* listenMerchantList() {
  try {
    const currentStory = yield select(currentStorySelector);
    const channel = yield call(
      onValueChannel,
      'stories/' + currentStory + '/merchants',
    );

    yield takeEvery(channel, function*(data) {
      yield put(actionsMerchants.setMerchantList(data));
    });

    yield take([
      actionsTypesAppState.CANCEL_ALL_WATCH,
      actionsTypesAppState.RESET_APP,
    ]);
    channel.close();
  } catch (error) {
    console.log('listenMerchantList try saga err:', { error });

    yield call(merchantsError);
  }
}

export function* watchCallListenMerchantList() {
  yield takeLatest(
    actionsTypesMerchants.CALL_LISTEN_MERCHANT_LIST,
    listenMerchantList,
  );
}

function* callEnhanceWeapon({ payload }) {
  try {
    const currentStory = yield select(currentStorySelector);
    const currentUid = yield select(currentUidSelector);
    const currentCharacter = yield select(currentCharacterSelector);
    const currentMerchant = yield select(currentMerchantSelector);

    firebaseDbSet(
      `stories/${currentStory}/characters/${currentUid}/character`,
      {
        ...currentCharacter,
        gold: currentCharacter.gold - payload.enhancePrice,
        weapons: payload.weaponsTab,
        items: payload.itemsTab,
      },
    ).catch(error => {
      // yield call(merchantsError, `could not set character in callEnhanceWeapon set saga${error}`);
    });

    firebaseDbSet(
      `stories/${currentStory}/merchants/${currentMerchant}/items`,
      {
        ...payload.merchantList
      },
    ).catch(error => {
      // yield call(merchantsError, `could not set merchant in callEnhanceWeapon set saga${error}`);
    });
  } catch (error) {
    console.log('callEnhanceWeapon try saga err:', { error });

    yield call(merchantsError);
  }
}

export function* watchCallEnhanceWeapon() {
  yield takeLatest(actionsTypesMerchants.ENHANCE_WEAPON, callEnhanceWeapon);
}
