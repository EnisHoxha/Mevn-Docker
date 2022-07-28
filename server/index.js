const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
//lidhja me databaze importimi
const database = require("./database/database");
const products = require("./routes/products");
const port = process.env.PORT;

app.use(cors());
app.use("/products", products);

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.listen(port, function () {
  console.log("Server is running " + port);
});
