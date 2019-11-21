import { delay } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import * as TransactionsActionTypes from 'actionTypes/transactionsActionTypes';
import * as TransactionsActions from 'actions/transactionsActions';
import * as ToastActions from 'actions/toastActions';
import { tokenSelector, childIdSelector } from 'selectors/selectors';
import { getTranslations } from 'utils/i18n';

import * as Api from './api';

function* transfertError(error = getTranslations('error.transfer.failed')) {
  yield put(TransactionsActions.transactionError(error));

  yield delay(5000);
  yield put(TransactionsActions.transactionError(''));
}

export function* startTransfert({ payload }) {
  try {
    const token = yield select(tokenSelector);

    if (token !== '') {
      const result = yield call(Api.newTransfert, token, payload);

      if (result && result.status < 300) {
        if (!result.data.is_3dsecure && result.data.status === 'SUCCEEDED') {
          yield put(TransactionsActions.transactionSuccess(result.data));
        } else if (result.data.is_3dsecure) {
          yield put(TransactionsActions.transaction3dPending(result.data));
        } else if (result.data.type === 'OUT') {
          // Handle Payout transactions
          yield put(TransactionsActions.transactionSuccess(result.data));
        }
      } else {
        console.log('startTransfert err: status is not 201');

        yield call(transfertError);
      }
    } else {
      console.log('startTransfert err: token is undefined');

      yield call(transfertError);
    }
  } catch (error) {
    console.log('startTransfert saga err:', { error });

    yield call(transfertError);
  }
}

export function* watchStartTransfert() {
  yield takeLatest(
    TransactionsActionTypes.START_TRANSACTION_REQUESTED,
    startTransfert
  );
}

/*
 ***** ***** Get all transactions ***** *****
*/

function* getAllTransactionsError(
  error = getTranslations('error.transfer.fetch')
) {
  yield put(TransactionsActions.getAllTransactionsError(error));

  yield delay(5000);
  yield put(TransactionsActions.getAllTransactionsError(''));
}

export function* getAllTransactions(childUuid = '') {
  try {
    const token = yield select(tokenSelector);
    const uuid =
      typeof childUuid !== 'string' || childUuid === ''
        ? yield select(childIdSelector)
        : childUuid;

    if (token !== '') {
      const result = yield call(Api.getAllTransactions, token, uuid);

      if (result && result.status < 300) {
        yield put(TransactionsActions.getAllTransactionsSuccess(result.data));

        let hasPendingTransaction = false;
        result.data.map(t => {
          if (t.status === 'PENDING' && t.type !== 'OUT') {
            hasPendingTransaction = true;
          }
          return null;
        });

        if (hasPendingTransaction) {
          yield put(
            ToastActions.setMessageToast(false, '', {
              hasPendingTransaction: true,
            })
          );
        }

        return result;
      }

      console.log('getAllTransactions err: status is not 201');

      yield call(getAllTransactionsError);
    } else {
      console.log('getAllTransactions err: token is undefined');

      yield call(getAllTransactionsError);
    }
  } catch (error) {
    console.log('getAllTransactions saga err:', { error });

    yield call(getAllTransactionsError);
  }

  return null;
}

export function* watchGetAllTransactions() {
  yield takeLatest(
    TransactionsActionTypes.GET_ALL_TRANSACTIONS_REQUESTED,
    getAllTransactions
  );
}
