// src/services/taxService.js

const Transaction = require('../models/Transaction');
const { TAX_RATES } = require('../utils/constants');

const calculateCapitalGainsFIFO = (transactions) => {
  let gains = 0;
  const inventory = [];

  transactions.forEach((tx) => {
    if (tx.type === 'buy') {
      inventory.push({ quantity: tx.quantity, price: tx.price });
    } else if (tx.type === 'sell') {
      let qtyToSell = tx.quantity;
      while (qtyToSell > 0 && inventory.length > 0) {
        const batch = inventory.shift();
        const qtySold = Math.min(batch.quantity, qtyToSell);
        gains += qtySold * (tx.price - batch.price);
        qtyToSell -= qtySold;

        if (batch.quantity > qtySold) {
          inventory.unshift({
            quantity: batch.quantity - qtySold,
            price: batch.price,
          });
        }
      }
    }
  });

  return gains;
};

const calculateIncomeTax = (incomeData) => {
  // Implement income tax calculation based on slabs
  // For simplicity, assume a flat rate
  const tax = incomeData.totalIncome * TAX_RATES.INCOME_TAX_RATE;
  return tax;
};

const summarizeTaxData = async (userId) => {
  // Fetch transactions
  const transactions = await Transaction.find({ userId }).sort({ date: 1 });

  // Calculate capital gains
  const capitalGains = calculateCapitalGainsFIFO(transactions);

  // Fetch income data (e.g., staking rewards)
  const incomeData = await getIncomeData(userId);

  // Calculate income tax
  const incomeTax = calculateIncomeTax(incomeData);

  // Summarize
  return {
    capitalGains,
    incomeTax,
    totalTaxLiability: capitalGains * TAX_RATES.CAPITAL_GAINS_TAX_RATE + incomeTax,
  };
};

const getIncomeData = async (userId) => {
  // Fetch income data from transactions or other sources
  return {
    totalIncome: 1000, // Placeholder
  };
};

module.exports = {
  calculateCapitalGainsFIFO,
  calculateIncomeTax,
  summarizeTaxData,
  getIncomeData,
};
