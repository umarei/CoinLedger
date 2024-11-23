// src/models/TaxReport.js

const mongoose = require('mongoose');

const taxReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    reportType: {
      type: String,
      enum: ['PDF', 'CSV'],
      required: true,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TaxReport', taxReportSchema);
