const express = require("express");
const { getAllItems, createItem } = require("../controllers/itemController");

const itemRouter = express.Router();

itemRouter.route("/")
  .get(getAllItems)
  .post(createItem);

module.exports = itemRouter;