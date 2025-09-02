const mongoose = require('mongoose');
const { Shop, Item } = require('../models'); // importa os models

// Conecta ao MongoDB


mongoose.connect('mongodb://127.0.0.1:27017/rollForShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const mongoUrl = 'mongodb://127.0.0.1:27017/rollForShop';
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB for seeding!');

  try {
    // Limpa collections existentes
    await Item.deleteMany({});
    await Shop.deleteMany({});

    // Cria itens
    const items = await Item.insertMany([
      { name: 'Sword of Testing', type: 'Weapon', rarity: 'Rare', description: 'A shiny test sword.' },
      { name: 'Shield of Debugging', type: 'Armor', rarity: 'Uncommon', description: 'Protects against bugs.' },
      { name: 'Potion of Refactoring', type: 'Consumable', rarity: 'Common', description: 'Improves code quality.' },
    ]);

    console.log('Items created:', items);

    // Cria shops e adiciona itens
    const shops = await Shop.insertMany([
      { name: 'Beginner\'s Armory', items: [items[0]._id, items[1]._id] },
      { name: 'Alchemist\'s Corner', items: [items[2]._id] },
    ]);

    console.log('Shops created:', shops);

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
});
