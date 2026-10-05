const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * Register API
 */
router.post('/register', authController.registerUser);

/**
 * Login API
 */
router.post('/login', authController.loginUser);

/**
 * Get Me API
 */
router.get('/get-me',authMiddleware.authUser, authController.getMe);

/**
 * Logout API
 */
router.get('/logout',authController.logoutUser);

module.exports = router;