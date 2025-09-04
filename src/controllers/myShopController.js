const MyShop = require('../models/myshop');

// Get all shops
exports.getAllMyShops = async (req, res) => {
  try {
    const shops = await MyShop.find();
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a shop by ID
exports.getMyShopById = async (req, res) => {
  try {
    const shop = await MyShop.findById(req.params.shopId);
    if (!shop) return res.status(404).json({ error: "MyShop not found" });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new shop
exports.createMyShop = async (req, res) => {
  try {
    const myShop = await MyShop.create({
      name: req.body.name,
      items: req.body.items ?? []
      
    });
    res.status(201).json(myShop);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Update a shop by ID
exports.updateMyShop = async (req, res) => {
  try {
    const shop = await MyShop.findByIdAndUpdate(
      req.params.shopId,
      req.body,
      { new: true }
    );
    if (!shop) return res.status(404).json({ error: "MyShop not found" });
    res.json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete all shops
exports.deleteAllMyShops = async (req, res) => {
  try {
    await MyShop.deleteMany();
    res.json({ message: "All MyShops deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a shop by ID
exports.deleteMyShopById = async (req, res) => {
  try {
    const shop = await MyShop.findByIdAndDelete(req.params.shopId);
    if (!shop) return res.status(404).json({ error: "MyShop not found" });
    res.json({ message: `MyShop ${req.params.shopId} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
