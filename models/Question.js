const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
