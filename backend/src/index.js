// src/index.js

// Load environment variables
require('dotenv').config();

// Import necessary modules
const app = require('./server');
const logger = require('./utils/logger');

// Environment variable validation
const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    logger.error(`Missing required environment variable: ${envVar}`);
    process.exit(1); // Exit process with failure
  }
});

// Log environment variables for debugging
logger.info('Environment variables loaded successfully');
console.log('Environment Variables:');
console.log(`PORT: ${process.env.PORT}`);
console.log(`MONGO_URI: ${process.env.MONGO_URI ? 'Loaded' : 'Not Set'}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? 'Loaded' : 'Not Set'}`);
console.log(`EMAIL_USER: ${process.env.EMAIL_USER || 'Not Set'}`);
console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? 'Loaded' : 'Not Set'}`);

// Set PORT with a fallback
const PORT = process.env.PORT || 4500;

// Global Error Handlers
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  logger.error(err.stack);
  console.error('Uncaught Exception:', err.stack);
  process.exit(1); // Exit process with failure code
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  console.error('Unhandled Rejection:', reason);
  process.exit(1); // Exit process with failure code
});

// Start the server
(async () => {
  try {
    logger.info('Starting the server...');
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Error starting the server: ${error.message}`);
    console.error('Error starting the server:', error.stack);
    process.exit(1);
  }
})();
