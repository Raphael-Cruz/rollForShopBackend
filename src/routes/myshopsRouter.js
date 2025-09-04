const express = require('express');
const {
  getAllMyShops,
  getMyShopById,
  createMyShop,
  updateMyShop,
  deleteAllMyShops,
  deleteMyShopById
} = require('../controllers/myShopController');

const myshopsRouter = express.Router();

// Routes without authentication/user
myshopsRouter.route('/')
  .get(getAllMyShops)
  .post(createMyShop)
  .delete(deleteAllMyShops);

myshopsRouter.route('/:shopId')
  .get(getMyShopById)
  .put(updateMyShop)
  .delete(deleteMyShopById);

module.exports = myshopsRouter;
