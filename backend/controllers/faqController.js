const FAQ = require('../models/FAQ');

// @desc    Get all FAQs
// @route   GET /api/faq
// @access  Public
exports.getAllFAQs = async (req, res) => {
  try {
    const { category } = req.query;
    
    const query = { isActive: true };
    if (category) query.category = category;

    const faqs = await FAQ.find(query).sort({ order: 1, createdAt: -1 });

    // Group by category
    const groupedFAQs = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: category ? faqs : groupedFAQs,
      count: faqs.length
    });
  } catch (error) {
    console.error('Get FAQs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve FAQs',
      error: error.message
    });
  }
};

// @desc    Get single FAQ
// @route   GET /api/faq/:id
// @access  Public
exports.getFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    // Increment view count
    faq.views += 1;
    await faq.save();

    res.status(200).json({
      success: true,
      data: faq
    });
  } catch (error) {
    console.error('Get FAQ error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve FAQ',
      error: error.message
    });
  }
};

// @desc    Create FAQ (Admin only)
// @route   POST /api/faq
// @access  Private/Admin
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, category, order } = req.body;

    const faq = await FAQ.create({
      question,
      answer,
      category,
      order
    });

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: faq
    });
  } catch (error) {
    console.error('Create FAQ error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create FAQ',
      error: error.message
    });
  }
};

// @desc    Update FAQ (Admin only)
// @route   PATCH /api/faq/:id
// @access  Private/Admin
exports.updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully',
      data: faq
    });
  } catch (error) {
    console.error('Update FAQ error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update FAQ',
      error: error.message
    });
  }
};

// @desc    Delete FAQ (Admin only)
// @route   DELETE /api/faq/:id
// @access  Private/Admin
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    console.error('Delete FAQ error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete FAQ',
      error: error.message
    });
  }
};

// @desc    Rate FAQ helpfulness
// @route   POST /api/faq/:id/rate
// @access  Public
exports.rateFAQ = async (req, res) => {
  try {
    const { helpful } = req.body; // true or false
    
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    if (helpful) {
      faq.helpful += 1;
    } else {
      faq.notHelpful += 1;
    }

    await faq.save();

    res.status(200).json({
      success: true,
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    console.error('Rate FAQ error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit rating',
      error: error.message
    });
  }
};
