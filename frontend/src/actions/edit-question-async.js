import { updateQuestion } from '../api';
import { ACTION_TYPE } from './ACTION_TYPE';

export const editQuestionAsync = (question) => (dispatch) => {
  updateQuestion(question).then((updatedQuestion) => {
    dispatch({ type: ACTION_TYPE.UPDATE_QUESTION, payload: updatedQuestion });
  });
};
