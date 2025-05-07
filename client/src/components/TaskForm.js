import { useState, useEffect } from 'react';
import axios from '../api/axios';
import OdetteScene from './OdetteScene';
import './TaskForm.css';

export default function TaskForm({ onTaskCreated, editTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [animationName, setAnimationName] = useState('city_action');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || '');
      setDescription(editTask.description || '');
      setStatus(editTask.status || 'Pending');
      setPriority(editTask.priority || 'Medium');
    }
  }, [editTask]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationName('city_idle');
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { title, description, status, priority };

    try {
      if (editTask?._id) {
        await axios.put(`/tasks/${editTask._id}`, payload);
      } else {
        await axios.post('/tasks', payload);
      }

      setTitle('');
      setDescription('');
      setStatus('Pending');
      setPriority('Medium');

      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      console.error('Error saving task:', error.response?.data || error.message);
      alert('Failed to save task');
    }

    setLoading(false);
  };

  return (
    <div className="task-form-container">
      <div className="odette-scene-wrapper">
        <OdetteScene animationName={animationName} />
      </div>

      <div className="form-overlay">
        <h2>{editTask ? 'Edit Task' : 'Create New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="form-input"
          />
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="form-input"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            className="form-input"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {editTask ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
