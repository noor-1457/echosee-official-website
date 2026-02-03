const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createPreOrder,
  getAllPreOrders,
  getPreOrder,
  updatePreOrderStatus,
  deletePreOrder
} = require('../controllers/preOrderController');
const rateLimit = require('express-rate-limit');

// Rate limiting for pre-orders
const preOrderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 pre-orders per hour
  message: 'Too many pre-order requests from this IP, please try again later'
});

// Validation middleware
const validatePreOrder = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required'),
  body('address.street')
    .trim()
    .notEmpty().withMessage('Street address is required'),
  body('address.city')
    .trim()
    .notEmpty().withMessage('City is required'),
  body('address.state')
    .trim()
    .notEmpty().withMessage('State/Province is required'),
  body('address.country')
    .trim()
    .notEmpty().withMessage('Country is required'),
  body('address.postalCode')
    .trim()
    .notEmpty().withMessage('Postal code is required'),
  body('plan')
    .isIn(['basic', 'premium']).withMessage('Invalid plan selected'),
  body('quantity')
    .isInt({ min: 1, max: 10 }).withMessage('Quantity must be between 1 and 10'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
];

// Public routes
router.post('/', preOrderLimiter, validatePreOrder, createPreOrder);
router.get('/:orderNumber', getPreOrder);

// Admin routes (add authentication middleware later)
router.get('/', getAllPreOrders);
router.patch('/:id', updatePreOrderStatus);
router.delete('/:id', deletePreOrder);

module.exports = router;
