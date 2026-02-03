const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createPartnership,
  getAllPartnerships,
  getPartnership,
  updatePartnership,
  deletePartnership,
  updatePriority
} = require('../controllers/partnershipController');
const rateLimit = require('express-rate-limit');

// Rate limiting for partnership requests
const partnershipLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 3, // 3 partnership requests per day
  message: 'Too many partnership requests from this IP, please try again later'
});

// Validation middleware
const validatePartnership = [
  body('organizationName')
    .trim()
    .notEmpty().withMessage('Organization name is required')
    .isLength({ max: 200 }).withMessage('Organization name cannot exceed 200 characters'),
  body('organizationType')
    .isIn(['school', 'university', 'ngo', 'healthcare', 'corporate', 'government', 'other'])
    .withMessage('Invalid organization type'),
  body('contactPerson.name')
    .trim()
    .notEmpty().withMessage('Contact person name is required'),
  body('contactPerson.designation')
    .trim()
    .notEmpty().withMessage('Designation is required'),
  body('contactPerson.email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('contactPerson.phone')
    .trim()
    .notEmpty().withMessage('Phone number is required'),
  body('partnershipType')
    .isIn(['distribution', 'csr', 'research', 'bulk-purchase', 'donation', 'other'])
    .withMessage('Invalid partnership type'),
  body('expectedVolume')
    .isIn(['1-10', '11-50', '51-100', '101-500', '500+'])
    .withMessage('Invalid expected volume'),
  body('budget')
    .isIn(['under-500k', '500k-1m', '1m-5m', '5m-10m', '10m+'])
    .withMessage('Invalid budget range'),
  body('timeline')
    .isIn(['immediate', '1-3-months', '3-6-months', '6-12-months', 'flexible'])
    .withMessage('Invalid timeline'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 50, max: 1000 }).withMessage('Description must be between 50 and 1000 characters')
];

// Public routes
router.post('/', partnershipLimiter, validatePartnership, createPartnership);

// Admin routes (add authentication middleware later)
router.get('/', getAllPartnerships);
router.get('/:id', getPartnership);
router.patch('/:id', updatePartnership);
router.delete('/:id', deletePartnership);
router.patch('/:id/priority', updatePriority);

module.exports = router;
