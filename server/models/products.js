const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  images: { type: [], required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  newproduct: { type: Boolean, default: false },
  sasiaProdukteve: { type: Number, default: 1 },
  updated_date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Products", ProductsSchema);
