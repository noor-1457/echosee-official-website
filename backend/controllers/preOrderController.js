const PreOrder = require('../models/PreOrder');
const { validationResult } = require('express-validator');

// Pricing configuration
const PRICING = {
  basic: 35000,
  premium: 40000
};

// @desc    Create new pre-order
// @route   POST /api/preorder
// @access  Public
exports.createPreOrder = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      fullName,
      email,
      phone,
      address,
      plan,
      quantity,
      notes,
      hearAboutUs
    } = req.body;

    // Calculate pricing
    const price = PRICING[plan] || PRICING.basic;
    const totalAmount = price * quantity;

    // Create pre-order
    const preOrder = await PreOrder.create({
      fullName,
      email,
      phone,
      address,
      plan,
      quantity,
      price,
      totalAmount,
      notes,
      hearAboutUs
    });

    // TODO: Send confirmation email

    res.status(201).json({
      success: true,
      message: 'Pre-order placed successfully! We will contact you soon.',
      data: {
        orderNumber: preOrder.orderNumber,
        totalAmount: preOrder.totalAmount,
        plan: preOrder.plan,
        quantity: preOrder.quantity
      }
    });
  } catch (error) {
    console.error('Pre-order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place pre-order. Please try again later.',
      error: error.message
    });
  }
};

// @desc    Get all pre-orders (Admin only)
// @route   GET /api/preorder
// @access  Private/Admin
exports.getAllPreOrders = async (req, res) => {
  try {
    const {
      orderStatus,
      paymentStatus,
      plan,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;
    
    const query = {};
    if (orderStatus) query.orderStatus = orderStatus;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (plan) query.plan = plan;

    const sortOrder = order === 'asc' ? 1 : -1;

    const preOrders = await PreOrder.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await PreOrder.countDocuments(query);

    // Calculate statistics
    const stats = await PreOrder.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          totalUnits: { $sum: '$quantity' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: preOrders,
      stats: stats[0] || { totalOrders: 0, totalRevenue: 0, totalUnits: 0 },
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get pre-orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve pre-orders',
      error: error.message
    });
  }
};

// @desc    Get single pre-order by order number
// @route   GET /api/preorder/:orderNumber
// @access  Public (with order number) / Private
exports.getPreOrder = async (req, res) => {
  try {
    const preOrder = await PreOrder.findOne({
      orderNumber: req.params.orderNumber
    });

    if (!preOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: preOrder
    });
  } catch (error) {
    console.error('Get pre-order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order',
      error: error.message
    });
  }
};

// @desc    Update pre-order status
// @route   PATCH /api/preorder/:id
// @access  Private/Admin
exports.updatePreOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    
    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const preOrder = await PreOrder.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!preOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // TODO: Send status update email

    res.status(200).json({
      success: true,
      data: preOrder
    });
  } catch (error) {
    console.error('Update pre-order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order',
      error: error.message
    });
  }
};

// @desc    Delete pre-order
// @route   DELETE /api/preorder/:id
// @access  Private/Admin
exports.deletePreOrder = async (req, res) => {
  try {
    const preOrder = await PreOrder.findByIdAndDelete(req.params.id);

    if (!preOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Delete pre-order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: error.message
    });
  }
};
