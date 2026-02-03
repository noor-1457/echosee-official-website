const express = require('express');
const router = express.Router();
const {
  getAllFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  rateFAQ
} = require('../controllers/faqController');

// Public routes
router.get('/', getAllFAQs);
router.get('/:id', getFAQ);
router.post('/:id/rate', rateFAQ);

// Admin routes (add authentication middleware later)
router.post('/', createFAQ);
router.patch('/:id', updateFAQ);
router.delete('/:id', deleteFAQ);

module.exports = router;
