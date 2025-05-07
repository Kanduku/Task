import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskDashboard from './pages/TaskDashboard';
import { getToken, clearToken } from './utils/auth';
import TaskForm from './components/TaskForm';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Loading from './components/Loading';

// Create a PrivateRoute component
const PrivateRoute = () => {
  const isLoggedIn = !!getToken();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
  };

  // Simulating a loading state (e.g., data fetching)
  useEffect(() => {
    if (!isLoggedIn) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Simulate data fetching delay
    }, 20); // Simulate a 2-second delay
  }, [isLoggedIn]);

  if (loading) {
    return <Loading />;  // Show loading spinner if app is loading
  }

  return (
    <div>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}

      <Routes>
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<TaskDashboard onLogout={handleLogout} />} />
          <Route path="/new-task" element={<TaskForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
