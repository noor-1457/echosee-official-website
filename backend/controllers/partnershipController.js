const Partnership = require('../models/Partnership');
const { validationResult } = require('express-validator');

// @desc    Create new partnership request
// @route   POST /api/partnership
// @access  Public
exports.createPartnership = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const partnershipData = req.body;

    // Create partnership request
    const partnership = await Partnership.create(partnershipData);

    // TODO: Send notification email to admin

    res.status(201).json({
      success: true,
      message: 'Partnership request submitted successfully! We will contact you soon.',
      data: {
        id: partnership._id,
        organizationName: partnership.organizationName,
        status: partnership.status
      }
    });
  } catch (error) {
    console.error('Partnership creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit partnership request. Please try again later.',
      error: error.message
    });
  }
};

// @desc    Get all partnerships (Admin only)
// @route   GET /api/partnership
// @access  Private/Admin
exports.getAllPartnerships = async (req, res) => {
  try {
    const {
      status,
      organizationType,
      priority,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (organizationType) query.organizationType = organizationType;
    if (priority) query.priority = priority;

    const sortOrder = order === 'asc' ? 1 : -1;

    const partnerships = await Partnership.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Partnership.countDocuments(query);

    // Calculate statistics by status
    const statusStats = await Partnership.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Calculate statistics by type
    const typeStats = await Partnership.aggregate([
      {
        $group: {
          _id: '$organizationType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: partnerships,
      stats: {
        byStatus: statusStats,
        byType: typeStats
      },
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get partnerships error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve partnerships',
      error: error.message
    });
  }
};

// @desc    Get single partnership
// @route   GET /api/partnership/:id
// @access  Private/Admin
exports.getPartnership = async (req, res) => {
  try {
    const partnership = await Partnership.findById(req.params.id);

    if (!partnership) {
      return res.status(404).json({
        success: false,
        message: 'Partnership not found'
      });
    }

    res.status(200).json({
      success: true,
      data: partnership
    });
  } catch (error) {
    console.error('Get partnership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve partnership',
      error: error.message
    });
  }
};

// @desc    Update partnership
// @route   PATCH /api/partnership/:id
// @access  Private/Admin
exports.updatePartnership = async (req, res) => {
  try {
    const partnership = await Partnership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!partnership) {
      return res.status(404).json({
        success: false,
        message: 'Partnership not found'
      });
    }

    // TODO: Send status update email if status changed

    res.status(200).json({
      success: true,
      message: 'Partnership updated successfully',
      data: partnership
    });
  } catch (error) {
    console.error('Update partnership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update partnership',
      error: error.message
    });
  }
};

// @desc    Delete partnership
// @route   DELETE /api/partnership/:id
// @access  Private/Admin
exports.deletePartnership = async (req, res) => {
  try {
    const partnership = await Partnership.findByIdAndDelete(req.params.id);

    if (!partnership) {
      return res.status(404).json({
        success: false,
        message: 'Partnership not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partnership deleted successfully'
    });
  } catch (error) {
    console.error('Delete partnership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete partnership',
      error: error.message
    });
  }
};

// @desc    Update partnership priority
// @route   PATCH /api/partnership/:id/priority
// @access  Private/Admin
exports.updatePriority = async (req, res) => {
  try {
    const { priority } = req.body;

    const partnership = await Partnership.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true, runValidators: true }
    );

    if (!partnership) {
      return res.status(404).json({
        success: false,
        message: 'Partnership not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Priority updated successfully',
      data: partnership
    });
  } catch (error) {
    console.error('Update priority error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update priority',
      error: error.message
    });
  }
};
