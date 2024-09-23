import { ACTION_TYPE } from '../actions';

const initialState = {
  questions: [],
  answers: [],
  currentIdx: 0,
  userAnswers: {},
  results: [],
  loading: false,
};

export const questionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_QUESTIONS:
      return { ...state, questions: payload };
    case ACTION_TYPE.CREATE_QUESTION:
      return { ...state, questions: [...state.questions, payload] };
    case ACTION_TYPE.UPDATE_QUESTION:
      const idx = state.questions.findIndex(
        (question) => question._id === payload._id
      );
      state.questions[idx] = payload;
      return { ...state, questions: state.questions };
    case ACTION_TYPE.DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question._id !== payload
        ),
      };
    case ACTION_TYPE.SET_ANSWERS:
      return { ...state, answers: payload };
    case ACTION_TYPE.INCREASE_CURRENT_IDX:
      return { ...state, currentIdx: state.currentIdx + 1 };
    case ACTION_TYPE.DECREASE_CURRENT_IDX:
      return { ...state, currentIdx: state.currentIdx - 1 };
    case ACTION_TYPE.SET_USER_ANSWERS:
      return {
        ...state,
        userAnswers: { ...state.userAnswers, [payload.key]: payload.value },
      };
    case ACTION_TYPE.SET_RESULTS:
      return { ...state, results: payload };
    case ACTION_TYPE.RELOAD_TEST:
      return initialState;
    default:
      return state;
  }
};
