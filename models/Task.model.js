const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedTo: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    priority: {
      type: String,
      enum: ['Висок', 'Среден', 'Нисък'],
      required: true,
    },
    description: {
      type: String,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.plugin(mongoosePaginate);

const model = mongoose.model('Task', TaskSchema);

module.exports = model;
