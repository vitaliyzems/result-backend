import { getQuestions } from '../api';
import { ACTION_TYPE } from './ACTION_TYPE';

export const fetchQuestionsAsync = () => async (dispatch) => {
  getQuestions().then((loadedQuestions) => {
    const answers = [];
    const questions = loadedQuestions.map((question) => {
      answers.push(question.answer);
      return question;
    });
    dispatch({ type: ACTION_TYPE.SET_QUESTIONS, payload: questions });
    dispatch({ type: ACTION_TYPE.SET_ANSWERS, payload: answers });
  });
};
