const mongoose = require('mongoose');
const validator = require('validator');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  name: {
    type: String,
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date
  },
  source: {
    type: String,
    enum: ['homepage', 'footer', 'popup', 'other'],
    default: 'other'
  },
  preferences: {
    productUpdates: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Boolean,
      default: true
    },
    news: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
newsletterSchema.index({ email: 1, status: 1 });

module.exports = mongoose.model('Newsletter', newsletterSchema);
