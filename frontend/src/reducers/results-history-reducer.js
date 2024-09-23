import { ACTION_TYPE } from '../actions';

const initialState = {
  resultsHistory: [],
};

export const resultsHistoryReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ACTION_TYPE.SET_RESULTS_HISTORY:
      return { ...state, resultsHistory: payload };
    default:
      return state;
  }
};
