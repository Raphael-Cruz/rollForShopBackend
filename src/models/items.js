const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  rarity: { type: String },
  description: { type: String },
});


const Item = mongoose.model('Item', itemSchema);
module.exports = Item;