import { getResults } from '../api';
import { calcCorrectAnswers } from '../utils';
import { ACTION_TYPE } from './ACTION_TYPE';

export const fetchResultsAsync = () => async (dispatch) => {
  getResults().then((loadedResults) => {
    const results = loadedResults.map(({ date, result, _id }) => {
      const correctCount = calcCorrectAnswers(result);
      return { _id, date, result, correctCount, count: result.length };
    });
    dispatch({ type: ACTION_TYPE.SET_RESULTS_HISTORY, payload: results });
  });
};
