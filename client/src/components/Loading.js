// components/Loading.js

import React from 'react';

function Loading() {
  return (
    <div style={styles.container}>
      <div className="spinner" style={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '24px',
    color: '#333',
  },
  spinner: {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
    margin: '0 auto',
  },
};

export default Loading;
