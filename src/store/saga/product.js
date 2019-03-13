import { takeLatest, all } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import API from '../api/product';

const fetchListProduct = createRequestSaga({
  request: API.getList,
  key: 'product_list',
  success: [],
  failure: []
});

const fetchListProductError = createRequestSaga({
  request: API.getListError,
  key: 'product_list',
  success: [],
  failure: []
});

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest('product/list', fetchListProduct),
      takeLatest('product/list_error', fetchListProductError)
    ]);
  }
];
