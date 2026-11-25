const express = require('express');
const mongoose = require('mongoose');
const Component = require('../models/Component');

const router = express.Router();

const handleError = (res, err, failMessage) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: failMessage, error: err.message });
  }
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: failMessage, error: 'Part number already exists' });
  }
  return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
};

const checkId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid component ID' });
  }
  next();
};

// CREATE
router.post('/', async (req, res) => {
  try {
    const component = await Component.create(req.body);
    res.status(201).json({ success: true, message: 'Component added successfully', data: component });
  } catch (err) {
    handleError(res, err, 'Failed to add component');
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const components = await Component.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: components.length, data: components });
  } catch (err) {
    handleError(res, err, 'Failed to fetch components');
  }
});

// READ ONE
router.get('/:id', checkId, async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ success: false, message: 'Component not found' });
    res.status(200).json({ success: true, data: component });
  } catch (err) {
    handleError(res, err, 'Failed to fetch component');
  }
});

// UPDATE
router.put('/:id', checkId, async (req, res) => {
  try {
    const component = await Component.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!component) return res.status(404).json({ success: false, message: 'Component not found' });
    res.status(200).json({ success: true, message: 'Component updated successfully', data: component });
  } catch (err) {
    handleError(res, err, 'Failed to update component');
  }
});

// DELETE
router.delete('/:id', checkId, async (req, res) => {
  try {
    const component = await Component.findByIdAndDelete(req.params.id);
    if (!component) return res.status(404).json({ success: false, message: 'Component not found' });
    res.status(200).json({ success: true, message: 'Component deleted successfully', data: component });
  } catch (err) {
    handleError(res, err, 'Failed to delete component');
  }
});

module.exports = router;
