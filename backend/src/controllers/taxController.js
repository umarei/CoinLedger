// src/controllers/taxController.js

const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');
const taxService = require('../services/taxService');

// @desc    Calculate capital gains using FIFO method
// @route   GET /api/tax/capital-gains
// @access  Private
const calculateCapitalGains = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  // Fetch transactions from database
  const transactions = await Transaction.find({ userId }).sort({ date: 1 });

  if (!transactions.length) {
    res.status(400);
    throw new Error('No transactions found for the user');
  }

  // Calculate capital gains
  const capitalGains = taxService.calculateCapitalGainsFIFO(transactions);

  res.status(200).json({
    message: 'Capital gains calculated successfully',
    capitalGains,
  });
});

// @desc    Calculate income tax based on slabs
// @route   GET /api/tax/income-tax
// @access  Private
const calculateIncomeTax = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  // Fetch income data (e.g., staking rewards)
  const incomeData = await taxService.getIncomeData(userId);

  // Calculate income tax
  const incomeTax = taxService.calculateIncomeTax(incomeData);

  res.status(200).json({
    message: 'Income tax calculated successfully',
    incomeTax,
  });
});

// @desc    Get tax summary
// @route   GET /api/tax/summary
// @access  Private
const getTaxSummary = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  // Get summarized tax data
  const summary = await taxService.summarizeTaxData(userId);

  res.status(200).json({
    message: 'Tax summary retrieved successfully',
    summary,
  });
});

module.exports = {
  calculateCapitalGains,
  calculateIncomeTax,
  getTaxSummary,
};
