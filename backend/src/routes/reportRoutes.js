// src/routes/reportRoutes.js

const express = require('express');
const {
  generateReport,
  getReports,
  getReport,
} = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.post('/generate', generateReport);
router.get('/', getReports);
router.get('/:id', getReport);

module.exports = router;
