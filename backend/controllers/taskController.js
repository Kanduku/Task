const Task = require('../models/Task');

// Create Task without file uploads
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }

    const taskData = { ...req.body, createdBy: req.user._id };

    // Removed file handling code here

    const task = new Task(taskData);
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

// Other functions remain unchanged
const getTasks = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    const filter = { createdBy: req.user._id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('assignedTo', 'name email');

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

// Other functions remain unchanged
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch task', error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
