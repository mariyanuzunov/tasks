const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    eic: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ClientSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'client',
});

const model = mongoose.model('Client', ClientSchema);

module.exports = model;
