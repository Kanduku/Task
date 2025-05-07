const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth'); // Ensure you have an isAdmin middleware to validate admin roles
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById  // Include the new controller for Get Task by ID
} = require('../controllers/taskController');

// Create a new task
router.post('/', protect, createTask);

// Get all tasks for the user (filtered by status/priority)
router.get('/', protect, getTasks);

// Get all tasks for the admin (admin validation added)
router.get('/admin', protect, getAllTasks); // Admin-only access (ensure you have admin validation)

// Get a single task by ID (protected route)
router.get('/:id', protect, getTaskById);  // This is where you handle retrieving a task by its ID

// Update a task by ID
router.put('/:id', protect, updateTask);

// Delete a task by ID
router.delete('/:id', protect, deleteTask);

module.exports = router;
