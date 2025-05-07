// components/Loading.js

import React from 'react';

function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#000',
    color: '#ffd700',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '6px solid rgba(255, 215, 0, 0.2)',
    borderTop: '6px solid #ffd700',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    boxShadow: '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.2rem',
    color: '#ffd700',
    fontWeight: '600',
    fontFamily: 'Arial, sans-serif',
  },
};

// Inject keyframes globally
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Loading;
