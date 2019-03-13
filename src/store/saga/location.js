import { all, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import locationAPI from '../api/location';

const requestFetchLocations = createRequestSaga({ request: locationAPI.fetchLocations });
const requestFetchXrayLocations = createRequestSaga({ request: locationAPI.fetchXrayLocations });

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest('location/list', requestFetchLocations),
      takeLatest('x-ray/list', requestFetchXrayLocations)
    ]);
  }
];
