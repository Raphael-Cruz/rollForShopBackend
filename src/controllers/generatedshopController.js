const GeneratedShop = require("../models/generatedShop");
const Item = require("../models/items");

// GET /generatedshop - retorna todos os generated shops
exports.getAllGeneratedShops = async (req, res) => {
  try {
    const shops = await GeneratedShop.find().populate("items");
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /generatedshop/:shopId - retorna um generated shop específico
exports.getGeneratedShopById = async (req, res) => {
  try {
    const shop = await GeneratedShop.findById(req.params.shopId).populate("items");
    if (!shop) return res.status(404).json({ error: "Generated Shop not found" });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /generatedshop - cria um new generated shop manualmente
exports.createGeneratedShop = async (req, res) => {
  try {
    const shop = await GeneratedShop.create(req.body);
    const populatedShop = await shop.populate("items");
    res.status(201).json(populatedShop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /generatedshop/generate - gera um shop aleatório
exports.generateRandomShop = async (req, res) => {
  try {
    const items = await Item.find();
    if (items.length === 0) return res.status(400).json({ error: "No items available to generate a shop" });

    const shuffled = items.sort(() => 0.5 - Math.random());
    const selectedItems = shuffled.slice(0, Math.min(3, items.length));

    const newShop = await GeneratedShop.create({
      name: `Generated Shop ${Date.now()}`,
      items: selectedItems.map(i => i._id),
    });

    const populatedShop = await newShop.populate("items");
    res.status(201).json(populatedShop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /generatedshop/:shopId - atualiza um generated shop
exports.updateGeneratedShop = async (req, res) => {
  try {
    const shop = await GeneratedShop.findByIdAndUpdate(req.params.shopId, req.body, { new: true }).populate("items");
    if (!shop) return res.status(404).json({ error: "Generated Shop not found" });
    res.json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /generatedshop - deleta todos os generated shops
exports.deleteAllGeneratedShops = async (req, res) => {
  try {
    await GeneratedShop.deleteMany({});
    res.json({ message: "All generated shops deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /generatedshop/:shopId - deleta um generated shop específico
exports.deleteGeneratedShopById = async (req, res) => {
  try {
    const shop = await GeneratedShop.findByIdAndDelete(req.params.shopId);
    if (!shop) return res.status(404).json({ error: "Generated Shop not found" });
    res.json({ message: `Generated Shop ${req.params.shopId} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
