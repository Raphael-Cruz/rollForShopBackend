const express = require("express");
const { 
  getAllShops,
  getShopById,
  createShop,
  updateShop,
  deleteAllShops,
  deleteShopById
} = require("../controllers/shopController");

const shopRouter = express.Router();

shopRouter.route("/")
  .get(getAllShops)
  .post(createShop)
  .put((req, res) => res.status(403).json({ error: "PUT operation not supported on /shop" }))
  .delete(deleteAllShops);

shopRouter.route("/:shopId")
  .get(getShopById)
  .put(updateShop)
  .delete(deleteShopById);

module.exports = shopRouter;
