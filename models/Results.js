const mongoose = require('mongoose');

const ResultsSchema = mongoose.Schema({
  date: {
    type: Number,
    required: true,
  },
  result: [{ type: Boolean, required: true }],
});

const Results = mongoose.model('Results', ResultsSchema);

module.exports = Results;
