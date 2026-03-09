const express = require("express");
const { checkLimit } = require('../middleware/checkLimit');
const auth = require("../middleware/auth");
const { getAllItems, getMyItems, createItem, deleteItem } = require("../controllers/itemController");

const itemRouter = express.Router();

itemRouter.get("/", getAllItems);
itemRouter.get("/mine", auth, getMyItems);
itemRouter.post("/", auth, checkLimit('item'), createItem);
itemRouter.delete("/:id", auth, deleteItem);

module.exports = itemRouter;