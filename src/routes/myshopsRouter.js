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

// Optional test authentication
const testAuth = (req, res, next) => {
  // Simulate a logged-in user
  req.user = { _id: '64f123456789abcdef123456' }; // replace with real ObjectId
  next();
};
myshopsRouter.use(testAuth);

myshopsRouter.route('/')
  .get(getAllMyShops)
  .post(createMyShop)
  .delete(deleteAllMyShops);

myshopsRouter.route('/:shopId')
  .get(getMyShopById)
  .put(updateMyShop)
  .delete(deleteMyShopById);

module.exports = myshopsRouter;