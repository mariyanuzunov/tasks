// const router = require('express').Router();
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const commentService = require('../services/comment.service');

exports.getTaskComments = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалидно ID!' });
  }

  const comments = await commentService.getAll(id);

  res.status(201).json({ data: comments });
});

exports.createTaskComment = asyncHandler(async (req, res) => {
  const author = req.user._id;
  const { id: task } = req.params;
  const { content } = req.body;

  const comment = await commentService.createOne({ author, task, content });

  res.status(201).json({ data: comment });
});

// router.get(
//   '/:taskId',
//   asyncHandler(async (req, res) => {
//     const { taskId } = req.params;

//     if (!mongoose.isValidObjectId(taskId)) {
//       return res.status(400).json({ message: 'invalid id' });
//     }

//     const comments = await commentService.getAll(taskId);

//     res.status(201).json({ data: comments });
//   })
// );

// router.post(
//   '/',
//   asyncHandler(async (req, res) => {
//     const author = req.user._id;
//     const { content, task } = req.body;

//     const comment = await commentService.createOne({ author, task, content });

//     res.status(201).json({ data: comment });
//   })
// );

// module.exports = router;
