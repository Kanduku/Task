const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet'); // For security enhancements
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Ensure essential environment variables are loaded
if (!process.env.PORT || !process.env.MONGO_URI) {
  console.error('Missing required environment variables');
  process.exit(1); // Exit if essential variables are missing
}

// Connect to the database
connectDB();

const app = express();

// Middleware setup
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')); // Log HTTP requests in the 'dev' format in development

// Static file serving (e.g., for uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Custom logger for all incoming requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});

// Catch-all error handler (added for better error management)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(err.statusCode || 500).json({
    message: err.message || 'Something went wrong, please try again later.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null, // Only show stack trace in development
  });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
