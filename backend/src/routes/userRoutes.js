// src/routes/userRoutes.js

const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.use(authMiddleware); // Apply auth middleware to all routes below

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

module.exports = router;
