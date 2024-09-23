export const calcCorrectAnswers = (results) =>
  results.reduce((acc, value) => (value ? acc + 1 : acc), 0);
