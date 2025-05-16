const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  pdfUrl: { type: String },
  type: {
    type: String,
    enum: ['BANKING', 'CAP MKTS', 'INSURANCE', 'GCC'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
