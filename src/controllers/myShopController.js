const MyShop = require('../models/myshop');
const mongoose = require('mongoose');

// For testing: create a fake user if req.user missing
const TEST_USER_ID = '64f123456789abcdef123456'; // replace with any valid ObjectId

exports.getAllMyShops = async (req, res) => {
  try {
    const userId = req.user?._id || TEST_USER_ID;
    const shops = await MyShop.find({ user: userId });
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyShopById = async (req, res) => {
  try {
    const userId = req.user?._id || TEST_USER_ID;
    const shop = await MyShop.findOne({ _id: req.params.shopId, user: userId });
    if (!shop) return res.status(404).json({ error: "MyShop not found" });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMyShop = async (req, res) => {
  try {
    const userId = req.user?._id || TEST_USER_ID;

    const myShop = await MyShop.create({
      name: req.body.name,
      items: req.body.items ?? [],
      user: userId
    });

    res.status(201).json(myShop);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.updateMyShop = async (req, res) => {
  try {
    const userId = req.user?._id || TEST_USER_ID;

    const shop = await MyShop.findOneAndUpdate(
      { _id: req.params.shopId, user: userId },
      req.body,
      { new: true }
    );

    if (!shop) return res.status(404).json({ error: "MyShop not found" });
    res.json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAllMyShops = async (req, res) => {
  try {
    const userId = req.user?._id || TEST_USER_ID;
    await MyShop.deleteMany({ user: userId });
    res.json({ message: "All MyShops deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMyShopById = async (req, res) => {
  try {
    const userId = req.user?._id || TEST_USER_ID;
    const shop = await MyShop.findOneAndDelete({ _id: req.params.shopId, user: userId });
    if (!shop) return res.status(404).json({ error: "MyShop not found" });
    res.json({ message: `MyShop ${req.params.shopId} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
