import { all, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import ServiceAPI from '../api/service';

const requestFetchServices = createRequestSaga({
  key: 'fetch_service',
  request: ServiceAPI.fetchServices,
  tokenRequired: true
});
const requestFetchServiceIssues = createRequestSaga({
  key: 'fetch_service_issue',
  request: ServiceAPI.fetchServiceIssues,
  tokenRequired: true
});
const requestFetchServiceIssueDetails = createRequestSaga({
  request: ServiceAPI.fetchServiceIssueDetails,
  tokenRequired: true
});
const requestFetchServiceIssueDetailById = createRequestSaga({
  request: ServiceAPI.fetchServiceIssueDetailById,
  tokenRequired: true
});
const requestFetchServiceGuide = createRequestSaga({
  request: ServiceAPI.fetchServiceGuide,
  tokenRequired: true
});
const requestCreateRating = createRequestSaga({
  request: ServiceAPI.createRating,
  tokenRequired: true
});
const requestLike = createRequestSaga({ request: ServiceAPI.like, tokenRequired: true });
const requestDislike = createRequestSaga({ request: ServiceAPI.dislike, tokenRequired: true });
const requestCheck = createRequestSaga({ request: ServiceAPI.check, tokenRequired: true });

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest('service/list', requestFetchServices),
      takeLatest('service/issue/list', requestFetchServiceIssues),
      takeLatest('service/issue/detail', requestFetchServiceIssueDetails),
      takeLatest('service/issue/detail/id', requestFetchServiceIssueDetailById),
      takeLatest('service/issue/guide', requestFetchServiceGuide),
      takeLatest('service/issue/detail/rating/create', requestCreateRating),
      takeLatest('service/issue/detail/rating/like', requestLike),
      takeLatest('service/issue/detail/rating/dislike', requestDislike),
      takeLatest('service/issue/detail/rating/check', requestCheck)
    ]);
  }
];
