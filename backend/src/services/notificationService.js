// src/services/notificationService.js

const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email notification
const sendEmailNotification = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.response}`);
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

// Optional SMS notification using Twilio
const sendSMSNotification = async (to, message) => {
  // Implement SMS sending using Twilio or another service
};

module.exports = {
  sendEmailNotification,
  sendSMSNotification,
};
