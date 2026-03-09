const express = require('express');
const auth = require('../middleware/auth');
const { checkLimit } = require('../middleware/checkLimit');
const {
  getAllMyShops,
  getMyShopById,
  createMyShop,
  updateMyShop,
  deleteAllMyShops,
  deleteMyShopById
} = require('../controllers/myShopController');

const myshopsRouter = express.Router();

myshopsRouter.use(auth);

myshopsRouter.route('/')
  .get(getAllMyShops)
  .post(checkLimit('shop'), createMyShop)
  .delete(deleteAllMyShops);

myshopsRouter.route('/:shopId')
  .get(getMyShopById)
  .put(updateMyShop)
  .delete(deleteMyShopById);

module.exports = myshopsRouter;