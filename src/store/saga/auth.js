import { all, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from './common';

import AuthAPI from '../api/auth';
import { updateTokens, removeIdentity } from '../actions/auth';

import IdentityAPI from '../api/identity';
import { updateIdentity, loadIdentity } from '../actions/identity';

const requestRegister = createRequestSaga({
  request: AuthAPI.register
});

const requestLogin = createRequestSaga({
  request: AuthAPI.login,
  success: [updateTokens, loadIdentity],
  error: [removeIdentity]
});

const requestUpdateUserInfo = createRequestSaga({
  request: AuthAPI.updateUser,
  tokenRequired: true
});

const requestLoginViaFacebook = createRequestSaga({
  request: AuthAPI.loginViaFacebook,
  success: [updateTokens, loadIdentity]
});

const requestLoginViaGoogle = createRequestSaga({
  request: AuthAPI.loginViaGoogle,
  success: [updateTokens, loadIdentity]
});

const requestForgotPasswordViaEmail = createRequestSaga({
  request: AuthAPI.forgotPasswordViaEmail
});

const requestCurrentUser = createRequestSaga({
  request: IdentityAPI.me,
  success: [updateIdentity],
  error: [removeIdentity],
  tokenRequired: true
});

const requestConfirmationPhone = createRequestSaga({
  request: AuthAPI.confirmationPhone,
  tokenRequired: true
});

const requestCreateConfirmationPhone = createRequestSaga({
  request: AuthAPI.createConfirmationPhone,
  tokenRequired: true
});

export default [
  function* registerWatcher() {
    yield all([takeLatest('auth/register', requestRegister)]);
  },
  function* authenticateWatcher() {
    yield all([
      takeLatest('auth/login', requestLogin),
      takeLatest('auth/loginViaFacebook', requestLoginViaFacebook),
      takeLatest('auth/forgotPasswordViaEmail', requestForgotPasswordViaEmail),
      takeLatest('auth/loginViaGoogle', requestLoginViaGoogle)
    ]);
  },

  function* profileWatcher() {
    yield all([
      takeLatest('identity/me', requestCurrentUser),
      takeLatest('auth/update/user', requestUpdateUserInfo),
      takeLatest('user/confirm/phone', requestConfirmationPhone),
      takeLatest('user/confirm/phone/create', requestCreateConfirmationPhone)
    ]);
  }
];
