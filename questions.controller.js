const Question = require('./models/Question');

const getQuestions = async () => {
  const questions = await Question.find();
  return questions;
};

const createQuestion = async (question) => {
  const createdQuestion = await Question.create(question);
  return createdQuestion;
};

const updateQuestion = async (question) => {
  const updatedQuestion = await Question.findByIdAndUpdate(
    question._id,
    question,
    {
      returnDocument: 'after',
    }
  );
  return updatedQuestion;
};

const deleteQuestion = async (id) => {
  const deletedQuestion = await Question.findByIdAndDelete(id);
  return deletedQuestion;
};

module.exports = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
