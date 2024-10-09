const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { loginUser } = require('./users-controller');
const auth = require('./middlewares/auth');
const {
  addAppointment,
  getAppointments,
} = require('./appointments-controller');

const port = 8888;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post('/auth', async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    res.send(user);
  } catch (e) {
    console.log(e);
  }
});

app.post('/appointment', async (req, res) => {
  try {
    const appointment = await addAppointment(req.body);
    res.send(appointment);
  } catch (e) {
    console.log(e);
  }
});

app.use(auth);

app.post('/appointments', async (req, res) => {
  try {
    const appointments = await getAppointments();
    res.send(appointments);
  } catch (e) {
    console.log(e);
  }
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
