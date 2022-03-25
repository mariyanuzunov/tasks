const TaskModel = require('../models/Task.model');

const ClientModel = require('../models/Client.model');

const populateTask = [
  {
    path: 'author',
    select: { firstName: 1 },
  },
  { path: 'assignedTo', select: { firstName: 1 } },
  { path: 'category', select: { title: 1 } },
  { path: 'client', select: { companyName: 1, eic: 1 } },
];

exports.getAll = async () => {
  return TaskModel.find()
    .select('title client assignedTo category dateEnd')
    .populate(populateTask);
};

exports.getOne = async (id) => {
  const foo = await ClientModel.findOne({ client: id }).populate('tasks');
  console.log(foo);

  // const task =

  return TaskModel.findById(id).populate(populateTask);
};

exports.createOne = async (data) => {
  const doc = await TaskModel.create(data);
  return doc.populate(populateTask);
};

exports.updateOne = async (id, data) => {
  const doc = await TaskModel.findByIdAndUpdate(id, data, { new: true });
  return doc.populate(populateTask);
};

exports.deleteOne = async (id) => {
  return TaskModel.findByIdAndRemove(id);
};
