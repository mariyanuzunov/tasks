const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const taskService = require('../services/task.service');

exports.getTasks = asyncHandler(async (req, res) => {
  const { page, limit, sortBy, orderBy } = req.query;
  const pagination = page || limit;
  const paginationOptions = {
    pagination,
    page,
    limit,
    // sort locale? more criterias?
    sort: { [sortBy || 'createdAt']: orderBy || 'asc' },
  };

  const tasks = await taskService.getAll(paginationOptions);

  return res.status(200).json(tasks);
});

exports.getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалидно ID!' });
  }

  const task = await taskService.getOne(id);

  if (!task) {
    return res.status(400).json({ message: `Не е намерена задача с ID ${id}` });
  }

  return res.status(200).json({ data: task });
});

exports.createTask = asyncHandler(async (req, res) => {
  let task;
  try {
    task = await taskService.createOne({
      ...req.body,
      author: req.user._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

  return res.status(201).json({ data: task });
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалидно ID!' });
  }

  const updatedTask = await taskService.updateOne(id, req.body);

  if (!updatedTask) {
    return res.status(400).json({ message: `Не е намерена задача с ID ${id}` });
  }

  return res.status(200).json({ data: updatedTask });
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалидно ID!' });
  }

  const task = await taskService.deleteOne(id);

  if (!task) {
    return res.status(400).json({ message: `Не е намерена задача с ID ${id}` });
  }

  return res.status(200).json({ data: { _id: task._id } });
});
