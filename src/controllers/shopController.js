const { Shop, Item } = require("../models");

// GET /shop - retorna todos os shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("items");
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /shop/:shopId - retorna um shop específico
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shopId).populate("items");
    if (!shop) return res.status(404).json({ error: "Shop not found" });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /shop - cria um novo shop
exports.createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /shop/:shopId - atualiza um shop
exports.updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.shopId, req.body, { new: true });
    if (!shop) return res.status(404).json({ error: "Shop not found" });
    res.json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /shop - deleta todos os shops
exports.deleteAllShops = async (req, res) => {
  try {
    await Shop.deleteMany({});
    res.json({ message: "All shops deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /shop/:shopId - deleta um shop específico
exports.deleteShopById = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.shopId);
    if (!shop) return res.status(404).json({ error: "Shop not found" });
    res.json({ message: `Shop ${req.params.shopId} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
