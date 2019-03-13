import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import QuestionAPI from '../api/question';

const requestSubmitQuestion = createRequestSaga({
  request: QuestionAPI.createQuestion,
  tokenRequired: true
});

const requestListQuestions = createRequestSaga({
  request: QuestionAPI.listQuestions,
  tokenRequired: true
});

const requestQuestionDetail = createRequestSaga({
  request: QuestionAPI.questionDetail,
  tokenRequired: true
});

const requestStageImage = createRequestSaga({
  request: QuestionAPI.stageImage,
  tokenRequired: true
});

export default [
  function* requestQuestionWatchers() {
    yield all([
      takeLatest('question/create', requestSubmitQuestion),
      takeLatest('question/list', requestListQuestions),
      takeLatest('question/detail', requestQuestionDetail),
      takeEvery('question/stageImage', requestStageImage)
    ]);
  }
];
