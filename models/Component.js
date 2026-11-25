const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema(
  {
    componentName: {
      type: String,
      required: [true, 'Component name is required'],
      trim: true,
      minlength: [2, 'Component name must contain at least 2 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: {
        values: ['Resistor', 'Capacitor', 'Inductor', 'Diode', 'Transistor', 'IC', 'Sensor', 'Microcontroller', 'Other'],
        message: '{VALUE} is not a valid category'
      }
    },
    partNumber: {
      type: String,
      required: [true, 'Part number is required'],
      trim: true,
      unique: true
    },
    manufacturer: {
      type: String,
      required: [true, 'Manufacturer is required'],
      trim: true
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      validate: { validator: Number.isInteger, message: 'Quantity must be a whole number' }
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: [0, 'Unit price cannot be negative']
    },
    supplierEmail: {
      type: String,
      required: [true, 'Supplier email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid supplier email']
    },
    status: {
      type: String,
      enum: { values: ['In Stock', 'Low Stock', 'Out of Stock'], message: '{VALUE} is not a valid status' },
      default: 'In Stock'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Component', componentSchema);
