const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question'],
    trim: true,
    maxlength: [300, 'Question cannot exceed 300 characters']
  },
  answer: {
    type: String,
    required: [true, 'Please provide an answer'],
    trim: true,
    maxlength: [2000, 'Answer cannot exceed 2000 characters']
  },
  category: {
    type: String,
    enum: ['general', 'product', 'technical', 'pricing', 'support', 'shipping'],
    default: 'general'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  helpful: {
    type: Number,
    default: 0
  },
  notHelpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
faqSchema.index({ category: 1, order: 1 });
faqSchema.index({ isActive: 1 });

module.exports = mongoose.model('FAQ', faqSchema);
