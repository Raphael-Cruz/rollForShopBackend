// src/seedMyShops.js
const mongoose = require('mongoose');
const { MyShop, Item } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/rollForShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB for seeding MyShops!');

  try {
    // Limpa collection de myshops
    await MyShop.deleteMany({});

    // ID de usuário de teste
    const testUserId = new mongoose.Types.ObjectId();

    // Pega alguns itens existentes
    const items = await Item.find().limit(3);

    // Cria myshops
    const myShops = await MyShop.insertMany([
      { name: 'Raphael\'s Armory', items: [items[0]._id, items[1]._id], user: testUserId },
      { name: 'Alchemist Workshop', items: [items[2]._id], user: testUserId }
    ]);

    console.log('MyShops created:', myShops);
  } catch (err) {
    console.error('Error seeding MyShops:', err);
  } finally {
    mongoose.connection.close();
  }
});
