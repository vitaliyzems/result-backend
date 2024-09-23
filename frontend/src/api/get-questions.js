export const getQuestions = () =>
  fetch('http://localhost:8888')
    .then((response) => response.json())
    .then((loadedQuestions) => loadedQuestions);
