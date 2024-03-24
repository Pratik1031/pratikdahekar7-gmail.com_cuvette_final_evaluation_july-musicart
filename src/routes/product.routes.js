const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.route("/allProduct").get(productController.product);

module.exports = router;
