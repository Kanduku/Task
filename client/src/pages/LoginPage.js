import React from 'react';
import LoginForm from '../components/LoginForm';
import GLBViewer from '../components/GLBViewer';  // Import GLBViewer component

export default function LoginPage({ onLogin }) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh'}}>
      {/* GLBViewer with 3D model and stars in background */}
      <GLBViewer /> {/* This renders the 3D model and stars background */}

      {/* Login UI overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: 'white',
        }}
      >
        <h2>Login</h2>
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
}
