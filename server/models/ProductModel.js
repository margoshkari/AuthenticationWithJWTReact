const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const ProductScheme = new Schema({
  ProductName: String,
  Price: String,
});

const Product = mongoose.model("products", ProductScheme);

module.exports = {
  Product,
};
