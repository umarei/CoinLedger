// src/utils/constants.js

module.exports = {
  // Tax Rates
  TAX_RATES: {
    CAPITAL_GAINS_TAX_RATE: 0.15, // 15% for capital gains
    INCOME_TAX_RATE: 0.25,        // 25% for income tax
  },

  // JWT Secret
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',

  // Supported Cryptocurrencies
  SUPPORTED_CRYPTOCURRENCIES: {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    LTC: 'Litecoin',
    XRP: 'Ripple',
    DOGE: 'Dogecoin',
    ADA: 'Cardano',
    SOL: 'Solana',
    DOT: 'Polkadot',
    MATIC: 'Polygon',
    USDT: 'Tether',
    USDC: 'USD Coin',
  },

  // API URLs
  API_URLS: {
    COINBASE_API: 'https://api.coinbase.com/v2/',
    BINANCE_API: 'https://api.binance.com/api/v3/',
  },

  // Error Codes
  ERROR_CODES: {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    SERVER_ERROR: 'SERVER_ERROR',
  },
};
