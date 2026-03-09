const express = require("express");
const { checkLimit } = require('../middleware/checkLimit');
const optionalAuth = require('../middleware/optionalAuth');
const {
  getAllGeneratedShops,
  getGeneratedShopById,
  createGeneratedShop,
  generateRandomShop,
  updateGeneratedShop,
  deleteAllGeneratedShops,
  deleteGeneratedShopById,
} = require("../controllers/generatedshopController");

const router = express.Router();

router.route("/")
  .get(getAllGeneratedShops)
  .post(createGeneratedShop)
  .put((req, res) => res.status(403).json({ error: "PUT not supported" }))
  .delete(deleteAllGeneratedShops);


router.route("/generate")
  .post(optionalAuth, checkLimit('shop'), generateRandomShop);

router.route("/:shopId")
  .get(getGeneratedShopById)
  .put(updateGeneratedShop)
  .delete(deleteGeneratedShopById);

module.exports = router;