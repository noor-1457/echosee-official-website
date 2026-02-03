const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const contactRoutes = require('./routes/contact');
const preOrderRoutes = require('./routes/preOrder');
const newsletterRoutes = require('./routes/newsletter');
const faqRoutes = require('./routes/faq');
const partnershipRoutes = require('./routes/partnership');

// Initialize express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/preorder', preOrderRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/partnership', partnershipRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'EchoSee API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.get('/', (req, res) => {
  res.send("hello")
});


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
