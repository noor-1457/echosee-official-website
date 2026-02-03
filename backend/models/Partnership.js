const mongoose = require('mongoose');
const validator = require('validator');

const partnershipSchema = new mongoose.Schema({
  // Organization Information
  organizationName: {
    type: String,
    required: [true, 'Please provide organization name'],
    trim: true,
    maxlength: [200, 'Organization name cannot exceed 200 characters']
  },
  organizationType: {
    type: String,
    enum: ['school', 'university', 'ngo', 'healthcare', 'corporate', 'government', 'other'],
    required: [true, 'Please select organization type']
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid URL'
    }
  },
  
  // Contact Person
  contactPerson: {
    name: {
      type: String,
      required: [true, 'Please provide contact person name'],
      trim: true
    },
    designation: {
      type: String,
      required: [true, 'Please provide designation'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      trim: true
    }
  },
  
  // Partnership Details
  partnershipType: {
    type: String,
    enum: ['distribution', 'csr', 'research', 'bulk-purchase', 'donation', 'other'],
    required: [true, 'Please select partnership type']
  },
  expectedVolume: {
    type: String,
    enum: ['1-10', '11-50', '51-100', '101-500', '500+'],
    required: [true, 'Please select expected volume']
  },
  budget: {
    type: String,
    enum: ['under-500k', '500k-1m', '1m-5m', '5m-10m', '10m+'],
    required: [true, 'Please select budget range']
  },
  timeline: {
    type: String,
    enum: ['immediate', '1-3-months', '3-6-months', '6-12-months', 'flexible'],
    required: [true, 'Please select timeline']
  },
  
  // Additional Information
  description: {
    type: String,
    required: [true, 'Please provide partnership description'],
    trim: true,
    minlength: [50, 'Description must be at least 50 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  // Status
  status: {
    type: String,
    enum: ['new', 'under-review', 'negotiating', 'approved', 'rejected', 'on-hold'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Internal Notes
  internalNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
partnershipSchema.index({ organizationType: 1, status: 1 });
partnershipSchema.index({ 'contactPerson.email': 1 });

module.exports = mongoose.model('Partnership', partnershipSchema);
