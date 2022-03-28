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
  return CategoryModel.findByIdAndRemove(id);
};
