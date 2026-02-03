const mongoose = require('mongoose');
const validator = require('validator');

const preOrderSchema = new mongoose.Schema({
  // Customer Information
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    trim: true,
    validate: {
      validator: function(v) {
        return validator.isMobilePhone(v, 'any');
      },
      message: 'Please provide a valid phone number'
    }
  },
  
  // Address Information
  address: {
    street: {
      type: String,
      required: [true, 'Please provide street address'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please provide state/province'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Please provide country'],
      trim: true,
      default: 'Pakistan'
    },
    postalCode: {
      type: String,
      required: [true, 'Please provide postal code'],
      trim: true
    }
  },
  
  // Product Selection
  plan: {
    type: String,
    enum: ['basic', 'premium'],
    default: 'basic',
    required: true
  },
  quantity: {
    type: Number,
    required: [true, 'Please specify quantity'],
    min: [1, 'Quantity must be at least 1'],
    max: [10, 'Maximum 10 units per order'],
    default: 1
  },
  
  // Pricing
  price: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  
  // Order Status
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  
  // Additional Information
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  orderNumber: {
    type: String,
    unique: true
  },
  
  // Marketing
  hearAboutUs: {
    type: String,
    enum: ['social-media', 'search-engine', 'friend', 'advertisement', 'news', 'other'],
    default: 'other'
  }
}, {
  timestamps: true
});

// Generate order number before saving
preOrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('PreOrder').countDocuments();
    this.orderNumber = `ECHO-${Date.now()}-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Index for faster queries
preOrderSchema.index({ email: 1, orderNumber: 1 });
preOrderSchema.index({ orderStatus: 1, createdAt: -1 });

module.exports = mongoose.model('PreOrder', preOrderSchema);
