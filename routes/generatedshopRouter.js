const express = require("express");
const generatedshopRouter = express.Router();
generatedshopRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Displaying the shop you generated");
  })
  .post((req, res) => {
    res.end(
      `Will add the shop: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /shop");
  })
  .delete((req, res) => {
    res.end("Deleting all shop");
  });



module.exports = generatedshopRouter;