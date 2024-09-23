export const postResults = (result) =>
  fetch('http://localhost:8888/results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(result),
  })
    .then((response) => response.json())
    .then(console.log);
