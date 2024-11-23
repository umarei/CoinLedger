// src/config/db.js

const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = () => {
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info('MongoDB connection established');
      console.log('MongoDB connection established');
    })
    .catch((error) => {
      logger.error(`MongoDB connection error: ${error.message}`);
      console.error('MongoDB connection error:', error);
      throw error; // Throw error to be caught in server.js
    });
};

module.exports = connectDB;
