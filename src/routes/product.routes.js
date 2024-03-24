const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.route("/allProduct").get(productController.product);
router.route("/filter").post(productController.filteredProducts);

module.exports = router;
