const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const categoryService = require('../services/category.service');

exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAll();
  res.status(200).json({ data: categories });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ message: 'Моля, въведете загавие на категорията!' });
  }

  try {
    const category = await categoryService.createOne({ title });
    return res.status(201).json({ data: category });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Тази категория вече съществува!' });
    }

    throw new Error(error);
  }
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалидно ID!' });
  }

  if (!title) {
    return res
      .status(400)
      .json({ message: 'Моля, въведете загавие на категорията!' });
  }

  let updatedCategory;

  try {
    updatedCategory = await categoryService.updateOne(id, title);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Тази категория вече съществува!' });
    }

    throw new Error(error);
  }

  if (!updatedCategory) {
    return res
      .status(400)
      .json({ message: `Не е намерена категория с ID ${id}` });
  }

  return res.status(200).json({ data: updatedCategory });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалидно ID!' });
  }

  const category = await categoryService.deleteOne(id);

  if (!category) {
    return res
      .status(400)
      .json({ message: `Не е намерена категория с ID ${id}` });
  }

  return res.status(200).json({ data: { _id: category._id } });
});
