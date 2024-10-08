const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const cors = require('cors');

const port = 8888;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://vitalyazems:10s5z4U06SHIXB36@test.hhvlw.mongodb.net/quiz?retryWrites=true&w=majority&appName=Test'
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port: ${port}...`));
    });
  });
