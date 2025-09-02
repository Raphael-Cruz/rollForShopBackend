const express = require("express");
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

// Rotas para /generatedshop
router.route("/")
  .get(getAllGeneratedShops)             // GET /generatedshop
  .post(createGeneratedShop)             // POST /generatedshop (manual)
  .put((req, res) => res.status(403).json({ error: "PUT operation not supported on /generatedshop" }))
  .delete(deleteAllGeneratedShops);      // DELETE /generatedshop

// Rota para geração aleatória
router.route("/generate")
  .post(generateRandomShop);             // POST /generatedshop/generate

// Rotas para /generatedshop/:shopId
router.route("/:shopId")
  .get(getGeneratedShopById)             // GET /generatedshop/:shopId
  .put(updateGeneratedShop)              // PUT /generatedshop/:shopId
  .delete(deleteGeneratedShopById);      // DELETE /generatedshop/:shopId

module.exports = router;
