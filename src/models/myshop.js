const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  quantity: { type: Number, default: 1 }
});

const myShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema],           // <-- raw items stored directly
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MyShop', myShopSchema);