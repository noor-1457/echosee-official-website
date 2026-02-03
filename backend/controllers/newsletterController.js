const Newsletter = require('../models/Newsletter');
const { validationResult } = require('express-validator');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, name, source } = req.body;

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return res.status(400).json({
          success: false,
          message: 'You are already subscribed to our newsletter'
        });
      } else {
        // Reactivate subscription
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = Date.now();
        existingSubscriber.unsubscribedAt = undefined;
        await existingSubscriber.save();

        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.'
        });
      }
    }

    // Create new subscription
    await Newsletter.create({
      email,
      name,
      source: source || 'other'
    });

    // TODO: Send welcome email

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter! Check your email for confirmation.'
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.',
      error: error.message
    });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our subscriber list'
      });
    }

    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = Date.now();
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe. Please try again later.',
      error: error.message
    });
  }
};

// @desc    Get all subscribers (Admin only)
// @route   GET /api/newsletter
// @access  Private/Admin
exports.getAllSubscribers = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const subscribers = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Newsletter.countDocuments(query);

    // Calculate statistics
    const activeCount = await Newsletter.countDocuments({ status: 'active' });
    const unsubscribedCount = await Newsletter.countDocuments({ status: 'unsubscribed' });

    res.status(200).json({
      success: true,
      data: subscribers,
      stats: {
        total: count,
        active: activeCount,
        unsubscribed: unsubscribedCount
      },
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve subscribers',
      error: error.message
    });
  }
};

// @desc    Update subscriber preferences
// @route   PATCH /api/newsletter/:id
// @access  Private/Admin or Public (with token)
exports.updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;

    const subscriber = await Newsletter.findByIdAndUpdate(
      req.params.id,
      { preferences },
      { new: true, runValidators: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Preferences updated successfully',
      data: subscriber
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: error.message
    });
  }
};

// @desc    Delete subscriber
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
exports.deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscriber deleted successfully'
    });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete subscriber',
      error: error.message
    });
  }
};
