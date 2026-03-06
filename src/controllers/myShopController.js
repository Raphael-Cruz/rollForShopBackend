const MyShop = require('../models/myshop');

// Get all shops (already correct)
exports.getAllMyShops = async (req, res) => {
  try {
    const shops = await MyShop.find({ user: req.user.id });
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a shop by ID (SECURE)
exports.getMyShopById = async (req, res) => {
  try {
    const shop = await MyShop.findOne({
      _id: req.params.shopId,
      user: req.user.id
    });

    if (!shop)
      return res.status(404).json({ error: "MyShop not found" });

    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create shop (correct)
exports.createMyShop = async (req, res) => {
  try {
    const myShop = await MyShop.create({
      name: req.body.name,
      items: req.body.items ?? [],
      formData: req.body.formData,
      user: req.user.id,
    });

    res.status(201).json(myShop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update shop (SECURE)
exports.updateMyShop = async (req, res) => {
  try {
    const shop = await MyShop.findOneAndUpdate(
      {
        _id: req.params.shopId,
        user: req.user.id
      },
      req.body,
      { new: true }
    );

    if (!shop)
      return res.status(404).json({ error: "MyShop not found" });

    res.json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete all shops (SCOPED TO USER)
exports.deleteAllMyShops = async (req, res) => {
  try {
    await MyShop.deleteMany({ user: req.user.id });

    res.json({ message: "All your MyShops deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete shop by ID (SECURE)
exports.deleteMyShopById = async (req, res) => {
  try {
    const shop = await MyShop.findOneAndDelete({
      _id: req.params.shopId,
      user: req.user.id
    });

    if (!shop)
      return res.status(404).json({ error: "MyShop not found" });

    res.json({ message: "MyShop deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};