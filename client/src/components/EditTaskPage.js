// pages/EditTaskPage.js
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import TaskForm from '../components/TaskForm';

export default function EditTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error('Error fetching task:', err);
        alert('Failed to load task');
      }
    };

    fetchTask();
  }, [id]);

  const handleTaskUpdated = () => {
    navigate('/'); // Go back to dashboard after editing
  };

  return (
    <div style={{ padding: '20px' }}>
      {task ? (
        <TaskForm editTask={task} onTaskCreated={handleTaskUpdated} />
      ) : (
        <p>Loading task...</p>
      )}
    </div>
  );
}
