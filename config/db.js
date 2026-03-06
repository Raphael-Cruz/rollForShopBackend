const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB via Mongoose'))
    .catch(err => console.error('MongoDB connection error:', err.message));

const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB error:', err.message));
db.on('disconnected', () => console.warn('MongoDB disconnected. Retrying...'));

module.exports = db;