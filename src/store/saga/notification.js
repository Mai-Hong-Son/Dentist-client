import { all, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import ServiceAPI from '../api/notification';
import screenPayload from '../actions/screen';

const requestFetchNotifications = createRequestSaga({
  request: ServiceAPI.fetchNotifications,
  tokenRequired: true,
  success: [() => ({ type: 'notification/read' })]
});

const requestChangeStatusNotifications = createRequestSaga({
  request: ServiceAPI.changeStatusNotifications,
  tokenRequired: true,
  success: [() => ({ type: 'notification/read' })]
});

const requestDeleteNotification = createRequestSaga({
  request: ServiceAPI.deleteNotification,
  tokenRequired: true,
  success: [() => ({ type: 'notification/read' })]
});

const requestDeleteAllNotification = createRequestSaga({
  request: ServiceAPI.deleteAllNotification,
  tokenRequired: true,
  success: [() => ({ type: 'notification/read' })]
});

const requestMarkAsReadNotification = createRequestSaga({
  request: ServiceAPI.fetchReadNotifications,
  tokenRequired: true,
  success: [
    ({ total_record }) =>
      screenPayload('notification', { total: total_record })
  ]
});

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest('notification/list', requestFetchNotifications),
      takeLatest('notification/delete', requestDeleteNotification),
      takeLatest('notification/delete/all', requestDeleteAllNotification),
      takeLatest('notification/read', requestMarkAsReadNotification),
      takeLatest('notification/change/status', requestChangeStatusNotifications)
    ]);
  },
];
