const router = require('express').Router();
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const taskService = require('../services/task.service');
const commentService = require('../services/comment.service');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    // const tasks = await taskService.getAll();
    // return res.status(200).json({ data: tasks });

    // with pagination
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
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'invalid id' });
    }

    const task = await taskService.getOne(id);

    if (!task) {
      return res.status(400).json({ message: `task with id ${id} not found` });
    }

    return res.status(200).json({ data: task });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
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
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'invalid id' });
    }

    const updatedTask = await taskService.updateOne(id, req.body);

    if (!updatedTask) {
      return res.status(400).json({ message: `task with id ${id} not found` });
    }

    return res.status(200).json({ data: updatedTask });
  })
);

// Delete permissions?
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'invalid id' });
    }

    const task = await taskService.deleteOne(id);

    if (!task) {
      return res.status(400).json({ message: `task with id ${id} not found` });
    }

    return res.status(200).json({ data: { _id: task._id } });
  })
);

// Comments

router.get(
  '/:id/comments',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'invalid id' });
    }

    const comments = await commentService.getAll(id);

    res.status(201).json({ data: comments });
  })
);

router.post(
  '/:id/comments',
  asyncHandler(async (req, res) => {
    const author = req.user._id;
    const { id: task } = req.params;
    const { content } = req.body;

    const comment = await commentService.createOne({ author, task, content });

    res.status(201).json({ data: comment });
  })
);

module.exports = router;
