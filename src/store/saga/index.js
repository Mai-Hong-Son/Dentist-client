import { fork, all } from 'redux-saga/effects';

import token from './token';
import auth from './auth';
import product from './product';
import service from './service';
import screen from './screen';
import question from './question';
import location from './location';
import answer from './answer';
import notification from './notification';
import promotion from './promotion';

const rootSaga = function* () {
  yield all([
    ...token.map(watcher => fork(watcher)),
    ...auth.map(watcher => fork(watcher)),
    ...product.map(watcher => fork(watcher)),
    ...screen.map(watcher => fork(watcher)),
    ...service.map(watcher => fork(watcher)),
    ...question.map(watcher => fork(watcher)),
    ...location.map(watcher => fork(watcher)),
    ...answer.map(watcher => fork(watcher)),
    ...notification.map(watcher => fork(watcher)),
    ...promotion.map(watcher => fork(watcher))
  ]);
};

export default rootSaga;
