export const getResults = () =>
  fetch('http://localhost:8888/results')
    .then((response) => response.json())
    .then((loadedResults) => loadedResults);
