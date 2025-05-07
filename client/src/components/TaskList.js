import { useEffect, useState, useCallback } from 'react';
import axios from '../api/axios';
import Loading from './Loading';
import styles from './../styles/TaskList.module.css';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Error fetching tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setDeletingTaskId(id);
    setError('');
    try {
      await axios.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Error deleting task. Please try again later.');
    } finally {
      setDeletingTaskId(null);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`/tasks/${id}`, editFormData);
      setEditingTaskId(null);
      await fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Error updating task. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditFormData({});
  };

  const renderMediaSection = (label, items) => {
    if (!items?.length) return null;
    return (
      <div className={styles.mediaSection}>
        <strong>{label}:</strong>
        <ul>
          {items.map((file, index) => (
            <li key={index}>
              <p><strong>Label:</strong> {file.label || 'Unnamed'}</p>
              <p><strong>Type:</strong> {file.type}</p>
              <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              {file.type === 'image' ? (
                <img src={file.url} alt={file.label || 'Image'} />
              ) : file.type === 'video' ? (
                <video controls>
                  <source src={file.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <a href={file.url} target="_blank" rel="noopener noreferrer">Download File</a>
              )}
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      
      
      {loading && <p className={styles.loading}><Loading /></p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && tasks.length === 0 && (
        <p className={styles.noTasks}>No tasks available. Create your first task!</p>
      )}

{tasks.map((task) => (
  <div key={task._id} className={styles.card}>
    {editingTaskId === task._id ? (
      <>
      <input
  type="text"
  name="title"
  value={editFormData.title}
  onChange={handleChange}
  placeholder="Title"
/>

<textarea
  name="description"
  value={editFormData.description}
  onChange={handleChange}
  placeholder="Description"
/>

<label>Status:</label>
<select
  name="status"
  value={editFormData.status}
  onChange={handleChange}
>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

<label>Priority:</label>
<select
  name="priority"
  value={editFormData.priority}
  onChange={handleChange}
>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>

<div className={styles.buttonGroup}>
  <button onClick={() => handleSaveEdit(task._id)} className={styles.editButton}>
    Save
  </button>
  <button onClick={handleCancelEdit} className={styles.deleteButton}>
    Cancel
  </button>
</div>

      </>
    ) : (
      <>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Priority:</strong> {task.priority}</p>

        {/* Display createdAt and updatedAt */}
        <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</p>

        {renderMediaSection('Images', task.images)}
        {renderMediaSection('Videos', task.videos)}
        {renderMediaSection('Files', task.files)}

        <div className={styles.buttonGroup}>
          <button
            onClick={() => handleEdit(task)}
            className={styles.editButton}
          >
            Edit
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            className={styles.deleteButton}
            disabled={deletingTaskId === task._id}
          >
            {deletingTaskId === task._id ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </>
    )}
  </div>
))}

    </div>
   
  );
}
