const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// Import routes
const authRoutes = require('./routes/auth.routes');

// Use routes
app.use('/api/auth', authRoutes);

module.exports = app;