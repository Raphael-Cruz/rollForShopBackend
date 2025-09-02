// src/script/itemSeed.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Item = require('../models/items'); // ajuste se necessário

// Conexão MongoDB
const mongoUri = 'mongodb://127.0.0.1:27017/rollForShop';
mongoose.set('strictQuery', false);

async function seedItems() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB!');

    // Caminho do JSON
    const dataPath = path.join(__dirname, '../data/items.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(rawData);

    const itemsArray = jsonData.item; // chave "item" do JSON

    if (!Array.isArray(itemsArray)) {
      throw new Error('JSON inválido: a chave "item" não é um array');
    }

    // Remove todos os itens existentes (opcional)
    await Item.deleteMany({});
    console.log('Old items removed.');

    // Insere todos os itens
    await Item.insertMany(itemsArray);
    console.log(`Seed completed! ${itemsArray.length} items added.`);

    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  } catch (err) {
    console.error('Error seeding items:', err);
  }
}

seedItems();
