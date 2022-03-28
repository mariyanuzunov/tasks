const router = require('express').Router();

const taskController = require('../controllers/task.controller');
const categoryController = require('../controllers/category.controller');
const commentController = require('../controllers/comment.controller');

// Task Categories

router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

// Tasks

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Task Comments

router.get('/:id/comments', commentController.getTaskComments);
router.post('/:id/comments', commentController.createTaskComment);

module.exports = router;
