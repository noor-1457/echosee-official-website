const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, phone, subject, message } = req.body;
    
    // Get IP address
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress
    });

    // TODO: Send email notification (implement with nodemailer)

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email
      }
    });
  } catch (error) {
    console.error('Contact creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.',
      error: error.message
    });
  }
};

// @desc    Get all contacts (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
exports.getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts',
      error: error.message
    });
  }
};

// @desc    Update contact status
// @route   PATCH /api/contact/:id
// @access  Private/Admin
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: error.message
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message
    });
  }
};
