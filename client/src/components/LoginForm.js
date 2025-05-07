import { useState } from 'react';
import axios from '../api/axios';
import { setToken } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import Loading from './Loading'; // Make sure the path is correct

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/auth/login', { email, password });
      setToken(res.data.token);
      onLogin(); // Update login state
      navigate('/'); // Redirect to dashboard
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      )}

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={{
          padding: '10px',
          borderRadius: '60px',
          border: '1px solid #ccc',
        }}
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={{
          padding: '10px',
          borderRadius: '60px',
          border: '1px solid #ccc',
        }}
      />

      <button
        type="submit"
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#ffcc00',
          color: '#000',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Login
      </button>

      <p style={{ textAlign: 'center', color: 'white' }}>
        Create an account?{' '}
        <Link
          to="/register"
          style={{
            color: '#ffcc00',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Register
        </Link>
      </p>
    </form>
  );
}
