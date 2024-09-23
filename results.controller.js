const Results = require('./models/Results');

const getResults = async () => {
  const results = await Results.find();
  return results;
};

const postResults = async (result) => {
  try {
    await Results.create(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getResults, postResults };
