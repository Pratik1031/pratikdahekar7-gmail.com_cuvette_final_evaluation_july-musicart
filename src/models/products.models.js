const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  price: {
    type: Number,
  },
  color: {
    type: String,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
