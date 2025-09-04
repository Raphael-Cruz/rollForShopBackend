const mongoose = require('mongoose');

// Sub-schema for required attunement tags (optional)
const reqAttuneTagSchema = new mongoose.Schema({
  class: { type: String }
});

// Full item schema matching frontend Item model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  source: { type: String },
  page: { type: Number },
  rarity: { type: String },
  type: { type: String, required: true, default: 'unknown' },
  quantity: { type: Number, default: 1 },
  cost: { type: Number },
  reqAttune: { type: String },
  reqAttuneTags: [reqAttuneTagSchema],
  wondrous: { type: Boolean },  
  weapon: { type: Boolean },
  baseItem: { type: String },
  weaponCategory: { type: String },
  property: [String],
  dmg1: { type: String },
  dmgType: { type: String },
  bonusWeapon: { type: String },
  bonusSpellAttack: { type: String },
  bonusSpellSaveDc: { type: String },
  focus: [String],
  grantsProficiency: { type: Boolean },
  weight: { type: mongoose.Schema.Types.Mixed },
  entries: { type: [mongoose.Schema.Types.Mixed], default: [] } // strings or objects
}, { _id: false }); // _id false to avoid nested ids in arrays

// Main shop schema
const myShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema],  
  createdAt: { type: Date, default: Date.now }
});
  

module.exports = mongoose.model('MyShop', myShopSchema);
  