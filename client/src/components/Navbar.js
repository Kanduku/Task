import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <h3 className="navbar-title">Task Manager</h3>

      {/* Hamburger Icon */}
      <button 
        className={`hamburger ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/new-task" className="nav-link" onClick={() => setIsOpen(false)}>New Task</Link>
        <Link to="/profile" className="nav-link" onClick={() => setIsOpen(false)}>Profile</Link>
        <button className="logout-btn" onClick={() => { setIsOpen(false); onLogout(); }}>Logout</button>
      </div>
    </nav>
  );
}
