import axios from 'axios';

// Create an Axios instance with a dynamic base URL, defaulting to localhost
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',  // Use environment variable or fallback to localhost
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',  // Disable caching for all requests
    'Pragma': 'no-cache',  // For legacy browsers
  },
});

// Request interceptor to add authorization token if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Attach token to request headers
    } else {
      console.warn('No token found');  // Optionally handle missing token (e.g., log warning)
    }
    return config;  // Return the updated config object
  },
  (error) => {
    // Handle request error globally (e.g., logging, custom behavior)
    return Promise.reject(error);  // Reject the error to propagate it
  }
);

// Response interceptor to handle errors globally
instance.interceptors.response.use(
  (response) => response,  // If response is successful, return it
  (error) => {
    // Handle errors in the response globally
    if (error.response && error.response.status === 401) {
      // For example, handle 401 (Unauthorized) by redirecting to login
      window.location.href = '/login';  // Redirect to login page (adjust URL as needed)
    } else if (error.response && error.response.status === 500) {
      // Handle server error (500) globally (e.g., show a global error message)
      alert('Server error. Please try again later.');
    } else if (!error.response) {
      // Handle cases where no response is received (e.g., network issues)
      alert('Network error. Please check your connection.');
    }
    return Promise.reject(error);  // Reject the error to propagate it
  }
);

export default instance;
