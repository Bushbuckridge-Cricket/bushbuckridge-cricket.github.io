const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN?.split(',') || '*',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'bcc-backend' });
});

// Routes
const apiRouter = require('./routes');
app.use('/api', apiRouter);

// Mongo connection and start
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

async function start() {
  try {
    if (!MONGODB_URI) {
      console.warn('MONGODB_URI not set. Server will start but DB is disconnected.');
    } else {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

