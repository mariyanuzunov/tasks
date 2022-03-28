const express = require('express');
const mongoose = require('mongoose');

const userController = require('./controllers/user.controller');
const taskRouter = require('./routes/task.routes');

const errorHandler = require('./middlewares/error.middleware');

const app = express();
const port = 1337;

mongoose.connect('mongodb://localhost:27017/tasksdemo');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// to be deleted >>>

async function withAuth(req, res, next) {
  const userModel = require('./models/User.model');
  const id = req.headers['x-id'];

  if (!id) {
    return res.status(401).json({ message: 'user not authenticated' });
  }

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(400).json('user not found');
    }

    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
}

app.use('/auth', userController);

//  <<<

app.use('/tasks', withAuth, taskRouter);
app.use('*', (req, res) => res.status(404).json({ message: 'Page Not Found' }));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
