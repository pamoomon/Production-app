const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);