// src/routes/transactionRoutes.js

const express = require('express');
const {
  getTransactions,
  addTransaction,
  getTransaction,
} = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get('/', getTransactions);
router.post('/', addTransaction);
router.get('/:id', getTransaction);

module.exports = router;
