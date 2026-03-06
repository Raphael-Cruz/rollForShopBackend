const express = require("express");
const { getAllItems, getMyItems, createItem, deleteItem } = require("../controllers/itemController");
const auth = require("../middleware/auth");

const itemRouter = express.Router();

// PUBLIC — full DB, no auth. Used by shop generator and "Stock the Shelves"
itemRouter.get("/", getAllItems);

// PROTECTED — only this user's created items. Used by "My Items" page
itemRouter.get("/mine", auth, getMyItems);

// PROTECTED — create item, stamps userId from JWT
itemRouter.post("/", auth, createItem);

// PROTECTED — delete own item only
itemRouter.delete("/:id", auth, deleteItem);

module.exports = itemRouter;