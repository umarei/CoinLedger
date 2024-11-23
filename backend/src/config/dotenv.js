// src/config/dotenv.js

const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const loadEnv = () => {
  const envPath = path.resolve(__dirname, '../../.env');

  if (!fs.existsSync(envPath)) {
    console.error('No .env file found. Please create one in the project root.');
    process.exit(1);
  }

  const result = dotenv.config({ path: envPath });

  if (result.error) {
    console.error('Failed to load .env file');
    process.exit(1);
  }

  // Validate required environment variables
  const requiredVars = ['MONGO_URI', 'JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS'];
  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.error(`Missing required environment variable: ${varName}`);
      process.exit(1);
    }
  });

  console.log('Environment variables loaded successfully');
};

module.exports = {
  loadEnv,
};
