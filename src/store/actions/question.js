export const createQuestion = (...args) => ({ type: 'question/create', args });
export const listQuestions = (...args) => ({ type: 'question/list', args });
export const questionDetail = (...args) => ({ type: 'question/detail', args });
export const stageImage = ({ image }, ...etc) => ({
  type: 'question/stageImage',
  args: [{ image }, ...etc]
});
export const stageFile = ({ file }, ...etc) => ({
  type: 'question/stageImage',
  args: [{ image: file }, ...etc]
});
