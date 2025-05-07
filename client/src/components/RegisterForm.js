import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import Loading from './Loading'; // Ensure path is correct

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
        style={{
          padding: '10px',
          borderRadius: '60px',
          border: '1px solid #ccc',
        }}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
        style={{
          padding: '10px',
          borderRadius: '60px',
          border: '1px solid #ccc',
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
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
        Register
      </button>

      <p style={{ textAlign: 'center', color: 'white' }}>
        Already have an account?{' '}
        <Link
          to="/login"
          style={{
            color: '#ffcc00',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Login
        </Link>
      </p>
    </form>
  );
}
