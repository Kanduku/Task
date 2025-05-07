// components/NotFound.js

import React from 'react';

function NotFound() {
  return (
    <div style={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
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
};

export default NotFound;
