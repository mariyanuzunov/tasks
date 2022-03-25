const CommentModel = require('../models/Comment.model');

// all comments / task only comments / user only comments ?

exports.getAll = async (taskId) => {
  return CommentModel.find({ id: taskId }).populate('author');
};

exports.createOne = async (data) => {
  const comment = await CommentModel.create(data);
  return comment.populate({
    path: 'author',
    select: { firstName: 1 },
  });
};
