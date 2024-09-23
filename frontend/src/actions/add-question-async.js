import { createQuestion } from '../api';
import { ACTION_TYPE } from './ACTION_TYPE';

export const addQuestionAsync = (newQuestion) => (dispatch) => {
  createQuestion(newQuestion).then((createdQuestion) => {
    dispatch({ type: ACTION_TYPE.CREATE_QUESTION, payload: createdQuestion });
  });
};
