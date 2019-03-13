// createRequestSaga({
//   request: API,
//   success: [
//     (data) => invokeCallback((data) => {
//       if (data) {

//         Navigation.showModal({

//         });
//       }
//     })
//   ]
// })
import { all, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import ServiceAPI from '../api/promotion';

const requestFetchPromotions = createRequestSaga({
  request: ServiceAPI.fetchPromotions,
  tokenRequired: true
});

const requestFetchPromotionDetail = createRequestSaga({
  request: ServiceAPI.fetchPromotionDetail,
  tokenRequired: true
});

const requestCreatePromotionRating = createRequestSaga({
  request: ServiceAPI.createPromotionRating,
  tokenRequired: true
});

const requestPromotionRatingLike = createRequestSaga({
  request: ServiceAPI.promotionRatingLike,
  tokenRequired: true
});

const requestPromotionRatingDislike = createRequestSaga({
  request: ServiceAPI.promotionRatingDislike,
  tokenRequired: true
});

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest('promotion/list', requestFetchPromotions),
      takeLatest('promotion/detail', requestFetchPromotionDetail),
      takeLatest('promotion/rating', requestCreatePromotionRating),
      takeLatest('promotion/rating/like', requestPromotionRatingLike),
      takeLatest('promotion/rating/dislike', requestPromotionRatingDislike),
    ]);
  }
];
