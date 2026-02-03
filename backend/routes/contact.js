const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const rateLimit = require('express-rate-limit');

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 requests per window
  message: 'Too many contact requests from this IP, please try again later'
});

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ max: 200 }).withMessage('Subject cannot exceed 200 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  body('phone')
    .optional()
    .trim()
];

// Public routes
router.post('/', contactLimiter, validateContact, createContact);

// Admin routes (add authentication middleware later)
router.get('/', getAllContacts);
router.patch('/:id', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;
