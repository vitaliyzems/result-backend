import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { thunk } from 'redux-thunk';
import { questionsReducer, resultsHistoryReducer } from './reducers';

const reducers = combineReducers({
  questions: questionsReducer,
  resultsHistory: resultsHistoryReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
