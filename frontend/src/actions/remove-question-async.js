import { deleteQuestion } from '../api';
import { ACTION_TYPE } from './ACTION_TYPE';

export const removeQuestionAsync = (id) => (dispatch) => {
  deleteQuestion(id).then((question) => {
    dispatch({ type: ACTION_TYPE.DELETE_QUESTION, payload: question._id });
  });
};
