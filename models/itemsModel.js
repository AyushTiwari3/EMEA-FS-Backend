const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  pdfUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);