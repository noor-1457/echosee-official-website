const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  subscribe,
  unsubscribe,
  getAllSubscribers,
  updatePreferences,
  deleteSubscriber
} = require('../controllers/newsletterController');
const rateLimit = require('express-rate-limit');

// Rate limiting for newsletter
const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 subscription attempts per hour
  message: 'Too many subscription requests from this IP, please try again later'
});

// Validation middleware
const validateSubscribe = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
];

const validateUnsubscribe = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
];

// Public routes
router.post('/subscribe', newsletterLimiter, validateSubscribe, subscribe);
router.post('/unsubscribe', validateUnsubscribe, unsubscribe);

// Admin routes (add authentication middleware later)
router.get('/', getAllSubscribers);
router.patch('/:id', updatePreferences);
router.delete('/:id', deleteSubscriber);

module.exports = router;
