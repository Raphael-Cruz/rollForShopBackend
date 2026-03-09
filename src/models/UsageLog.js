
const mongoose = require('mongoose');

const UsageLogSchema = new mongoose.Schema({
    identifier: { type: String, required: true },  // IP ou userId
    type: { type: String, enum: ['ip', 'user'], required: true },
    action: { type: String, enum: ['shop', 'item'], required: true },
    date: { type: String, required: true },  // "2025-03-09"
    count: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// índice único para evitar duplicatas
UsageLogSchema.index(
    { identifier: 1, type: 1, action: 1, date: 1 },
    { unique: true }
);

// TTL: apaga automaticamente após 25h
UsageLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90000 });

module.exports = mongoose.model('UsageLog', UsageLogSchema);