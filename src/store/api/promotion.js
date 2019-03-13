import { API, withToken } from './common';

export default {
  fetchPromotions: token => withToken(token, API.get, 'promotions?sorts[created_at]=-1'),
  fetchPromotionDetail: (token, id) => withToken(token, API.get, `promotions/${id}`),
  createPromotionRating: (token, promotionId) =>
    withToken(token, API.post, 'promotion-ratings', { post_id: promotionId }),
  promotionRatingLike: (token, promotionId) =>
    withToken(token, API.patch, 'promotion-ratings', { status: 1, post_id: promotionId }),
  promotionRatingDislike: (token, promotionId) =>
    withToken(token, API.patch, 'promotion-ratings', { status: 2, post_id: promotionId })
};
