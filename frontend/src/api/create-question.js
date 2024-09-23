export const createQuestion = (newQuestion) =>
  fetch('http://localhost:8888/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(newQuestion),
  })
    .then((response) => response.json())
    .then((createdQuestion) => createdQuestion);
