const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model('Category', CategorySchema);

module.exports = model;
