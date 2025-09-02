const mongoose = require('mongoose');

const reqAttuneTagSchema = new mongoose.Schema({
  class: { type: String },
}, { _id: false });

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  source: { type: String },
  page: { type: Number },
  rarity: { type: String },
  type: { type: String, required: true, default: 'unknown' }, 
  quantity: { type: Number },
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
  entries: { type: [mongoose.Schema.Types.Mixed], default: [] }, // aceita strings ou objetos
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
