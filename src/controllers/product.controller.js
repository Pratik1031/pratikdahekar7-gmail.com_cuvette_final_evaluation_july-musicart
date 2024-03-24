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

module.exports = { product };
