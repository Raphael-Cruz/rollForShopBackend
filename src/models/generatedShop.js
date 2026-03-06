const mongoose = require('mongoose');

const generatedShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  generatedAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('GeneratedShop', generatedShopSchema);