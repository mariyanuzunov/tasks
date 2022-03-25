const CategoryModel = require('../models/Category.model');

exports.getAll = async () => {
  return CategoryModel.find();
};

exports.getOne = async () => {
  // not implemented
};

exports.createOne = async (data) => {
  return CategoryModel.create(data);
};

exports.updateOne = async (id, title) => {
  return CategoryModel.findByIdAndUpdate(id, { title }, { new: true });
};

exports.deleteOne = async (id) => {
  //   throw new Error('msg');
  return CategoryModel.findByIdAndRemove(id);
};

// module.exports = {
//   getAll,
//   getOne,
//   createOne,
//   updateOne,
//   deleteOne,
// };
