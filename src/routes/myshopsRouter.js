const express = require('express');
const auth = require('../middleware/auth');
const {
  getAllMyShops,
  getMyShopById,
  createMyShop,
  updateMyShop,
  deleteAllMyShops,
  deleteMyShopById
} = require('../controllers/myShopController');

const myshopsRouter = express.Router();

// Apply authentication to ALL routes in this router
myshopsRouter.use(auth);

myshopsRouter.route('/')
  .get(getAllMyShops)
  .post(createMyShop)
  .delete(deleteAllMyShops);

myshopsRouter.route('/:shopId')
  .get(getMyShopById)
  .put(updateMyShop)
  .delete(deleteMyShopById);

module.exports = myshopsRouter;