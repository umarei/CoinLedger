// src/controllers/reportController.js

const asyncHandler = require('express-async-handler');
const TaxReport = require('../models/TaxReport');
const taxService = require('../services/taxService');
const notificationService = require('../services/notificationService');
const { generatePDFReport, generateCSVReport } = require('../utils/reportGenerator');

// @desc    Generate a tax report
// @route   POST /api/reports/generate
// @access  Private
const generateReport = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { reportType } = req.body;

  // Fetch tax data
  const taxData = await taxService.summarizeTaxData(userId);

  // Generate report
  let fileUrl;
  if (reportType === 'PDF') {
    fileUrl = await generatePDFReport(userId, taxData);
  } else if (reportType === 'CSV') {
    fileUrl = await generateCSVReport(userId, taxData);
  } else {
    res.status(400);
    throw new Error('Invalid report type');
  }

  // Save report to database
  const report = await TaxReport.create({
    userId,
    reportType,
    generatedAt: new Date(),
    fileUrl,
  });

  // Send notification
  await notificationService.sendEmailNotification(
    req.user.email,
    'Your tax report is ready',
    `You can download your report from ${fileUrl}`
  );

  res.status(201).json({
    message: 'Tax report generated successfully',
    report,
  });
});

// @desc    Get all reports for a user
// @route   GET /api/reports
// @access  Private
const getReports = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const reports = await TaxReport.find({ userId }).sort({ generatedAt: -1 });

  res.status(200).json({
    message: 'Reports retrieved successfully',
    reports,
  });
});

// @desc    Download a specific report
// @route   GET /api/reports/:id
// @access  Private
const getReport = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const reportId = req.params.id;

  const report = await TaxReport.findOne({ _id: reportId, userId });

  if (!report) {
    res.status(404);
    throw new Error('Report not found');
  }

  // Logic to serve the file
  res.download(report.fileUrl);
});

module.exports = {
  generateReport,
  getReports,
  getReport,
};
