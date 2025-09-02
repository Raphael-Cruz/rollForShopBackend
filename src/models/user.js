const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String }, // pode ser vazio para testes
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;