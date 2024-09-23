export const updateQuestion = (question) =>
  fetch('http://localhost:8888/', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(question),
  })
    .then((response) => response.json())
    .then((updatedQuestion) => updatedQuestion);
