const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  rarity: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('Item', itemSchema);