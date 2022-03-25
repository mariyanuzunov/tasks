const router = require('express').Router();
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const categoryService = require('../services/category.service');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    console.log(req.user);
    const categories = await categoryService.getAll();
    res.status(200).json({ data: categories });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
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
          .json({ message: 'this category already exists' });
      }

      throw new Error(error);
    }
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'invalid id' });
    }

    if (!title) {
      return res.status(400).json({ message: 'title field is required' });
    }

    let updatedCategory;

    try {
      updatedCategory = await categoryService.updateOne(id, title);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: 'this category already exists' });
      }

      throw new Error(error);
    }

    if (!updatedCategory) {
      return res
        .status(400)
        .json({ message: `category with id ${id} not found` });
    }

    return res.status(200).json({ data: updatedCategory });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'invalid id' });
    }

    const category = await categoryService.deleteOne(id);

    if (!category) {
      return res
        .status(400)
        .json({ message: `category with id ${id} not found` });
    }

    return res.status(200).json({ data: { _id: category._id } });
  })
);

module.exports = router;
