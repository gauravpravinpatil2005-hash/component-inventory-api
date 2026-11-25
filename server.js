require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const componentRoutes = require('./routes/components');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Electronic Component Inventory API', endpoints: '/api/components' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Component Inventory API is running' });
});

app.use('/api/components', componentRoutes);

// Malformed JSON body / unknown route handlers
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON in request body' });
  }
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/component_inventory_db';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
