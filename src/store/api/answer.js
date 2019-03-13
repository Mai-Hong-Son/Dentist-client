import { API, withToken } from './common';

export default {
  fetchAnswerDetail: (token, questionId) =>
    withToken(
      token,
      API.get,
      `answers?filters[question_id]=${questionId}`
    ),
  fetchResultDetail: (token, resultId) =>
    withToken(
      token,
      API.get,
      `consultings/results/${resultId}`
    ),
  fetchTimeDetail: (token, timeId) =>
    withToken(
      token,
      API.get,
      `consultings/time/${timeId}`
    ),
  fetchSurgeryDetail: (token, surgeryId) =>
    withToken(
      token,
      API.get,
      `consultings/surgeries/${surgeryId}`
    ),
};
