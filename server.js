const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const cors = require('cors');
const {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('./questions.controller');
const { postResults, getResults } = require('./results.controller');

const port = 8888;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const questions = await getQuestions();
  res.send(questions);
});

app.get('/results', async (req, res) => {
  const results = await getResults();
  res.send(results);
});

app.post('/', async (req, res) => {
  const createdQuestion = await createQuestion(req.body);
  res.send(createdQuestion);
});

app.post('/results', async (req, res) => {
  const results = req.body;
  await postResults(results);
});

app.put('/', async (req, res) => {
  const updatedQuestion = await updateQuestion(req.body);
  res.send(updatedQuestion);
});

app.delete('/:id', async (req, res) => {
  const deletedQuestion = await deleteQuestion(req.params.id);
  res.send(deletedQuestion);
});

mongoose
  .connect(
    'mongodb+srv://vitalyazems:10s5z4U06SHIXB36@test.hhvlw.mongodb.net/quiz?retryWrites=true&w=majority&appName=Test'
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port: ${port}...`));
    });
  });
