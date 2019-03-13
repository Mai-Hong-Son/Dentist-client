import { all, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import AnswerAPI from '../api/answer';

const requestAnswerDetail = createRequestSaga({
  request: AnswerAPI.fetchAnswerDetail,
  tokenRequired: true
});

const requestResultDetail = createRequestSaga({
  request: AnswerAPI.fetchResultDetail,
  tokenRequired: true
});

const requestTimeDetail = createRequestSaga({
  request: AnswerAPI.fetchTimeDetail,
  tokenRequired: true
});

const requestSurgeryDetail = createRequestSaga({
  request: AnswerAPI.fetchSurgeryDetail,
  tokenRequired: true
});

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest('answer/detail', requestAnswerDetail),
      takeLatest('answer/result/detail', requestResultDetail),
      takeLatest('answer/time/detail', requestTimeDetail),
      takeLatest('answer/surgery/detail', requestSurgeryDetail)
    ]);
  }
];
