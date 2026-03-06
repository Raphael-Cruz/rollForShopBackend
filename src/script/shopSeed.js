const mongoose = require('mongoose');
const { Shop, Item } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/rollForShop');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB for seeding shops!');

  try {
    // Limpa os shops existentes
    await Shop.deleteMany({});

    // Pega os itens que já existem no banco
    const items = await Item.find();
    if (!items.length) {
      console.log('No items found. Seed items first.');
      return;
    }

    // Cria shops associando os itens
    const shops = await Shop.insertMany([
      { name: 'Beginner\'s Armory', items: [items[0]._id, items[1]._id] },
      { name: 'Alchemist\'s Corner', items: [items[2]._id] },
    ]);

    console.log('Shops created:', shops);
  } catch (err) {
    console.error('Error seeding shops:', err);
  } finally {
    mongoose.connection.close();
  }
});