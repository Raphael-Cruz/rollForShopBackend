const mongoose = require('mongoose');
const { User } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/rollForShop');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB for seeding user!');

  try {
    await User.deleteMany({}); // limpa usuários existentes

    const user = await User.create({
      username: 'raphael',
      email: 'raphael@example.com',
      password: 'test' // não importa por agora
    });

    console.log('User created:', user);
  } catch (err) {
    console.error('Error seeding user:', err);
  } finally {
    mongoose.connection.close();
  }
});