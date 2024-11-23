// src/models/Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['buy', 'sell'],
      required: true,
    },
    crypto: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be positive'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be positive'],
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    exchange: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
