const Product = require("../models/products.models");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const product = asyncHandler(async (req, res) => {
  /*
1. get data from db
 */

  const productlist = await Product.find();
  // console.log(productlist);

  if (!productlist) {
    throw new ApiError(400, "Unable To Fetch Products");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, productlist, "Products Fetched Successfully"));
});

const filteredProducts = asyncHandler(async (req, res) => {
  const filters = {};
  const sort = {};

  if (req.body.brand) filters.brand = req.body.brand;
  if (req.body.type) filters.type = req.body.type;
  if (req.body.color) filters.color = req.body.color;
  if (req.body.price) {
    const priceRange = req.body.price.split("-").map(Number);
    filters.price = { $gte: priceRange[0], $lte: priceRange[1] };

    console.log(priceRange);
    console.log(filters.price);
    console.log(req.body.price);
  }

  if (req.body.sort_products) {
    switch (req.body.sort_products) {
      case "lowest":
        sort.price = 1;
        break;
      case "highest":
        sort.price = -1;
        break;
      case "atoz":
        sort.brand = 1;
        break;
      case "ztoa":
        sort.brand = -1;
        break;
      default:
        sort.createdAt = -1;
    }
  }
  const filtered = await Product.find(filters).sort(sort);

  if (!filtered || filtered.length === 0) {
    throw new ApiError(400, "Unable to find Data");
  }

  res
    .status(200)
    .json(new ApiResponse(200, filtered, "Data Filtered Successfully"));
});

module.exports = { product, filteredProducts };
