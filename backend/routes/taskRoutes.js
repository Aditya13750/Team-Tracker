const express = require('express');
const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// Public routes (logged-in users)
router.get('/', getTasks);
router.get('/:id', getTask);
router.patch('/:id', updateTask);

// Admin only routes
router.post('/', authorize('admin'), createTask);
router.delete('/:id', authorize('admin'), deleteTask);

module.exports = router;
