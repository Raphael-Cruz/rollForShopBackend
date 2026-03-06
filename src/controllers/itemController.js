const Item = require("../models/items");

// GET /items — PUBLIC, full database. Used by shop generator + Stock the Shelves
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /items/mine — PROTECTED, only the logged-in user's created items
exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user._id ?? req.user.id });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /items — PROTECTED, stamp userId from JWT
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      userId: req.user._id ?? req.user.id
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /items/:id — PROTECTED, only owner can delete
exports.deleteItem = async (req, res) => {
  try {
    const userId = req.user._id ?? req.user.id;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    if (String(item.userId) !== String(userId)) {
      return res.status(403).json({ error: 'Not authorised to delete this item' });
    }

    await item.deleteOne();
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}