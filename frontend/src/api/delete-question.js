export const deleteQuestion = (id) =>
  fetch(`http://localhost:8888/${id}`, {
    method: 'DELETE',
    // headers: { 'Content-Type': 'application/json;charset=utf-8' },
    // body: JSON.stringify(id),
  })
    .then((response) => response.json())
    .then((deletedQuestion) => deletedQuestion);
