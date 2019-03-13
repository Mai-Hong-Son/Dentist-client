export const listPromotion = (...args) => ({ type: 'promotion/list', args });
export const promotionDetail = (...args) => ({ type: 'promotion/detail', args });
export const promotionRating = (...args) => ({ type: 'promotion/rating', args });
export const promotionRatingLike = (...args) => ({ type: 'promotion/rating/like', args });
export const promotionRatingDislike = (...args) => ({ type: 'promotion/rating/dislike', args });
