const express = require("express");
const Product = require("../models/product");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/products", authMiddleware, async (req, res) => {
  const { name, description, price, quantity, imageurl } = req.body;
  try {
    const newProduct = await Product({
      name,
      description,
      price,
      quantity,
      imageurl,
    });
    console.log(newProduct, name, description, req, req.body, price, quantity, imageurl, "newProductdes");
    const savedproduct = await newProduct.save();
    console.log(savedproduct, "savedproduct");
    res.status(200).json({ savedproduct, message: "product added successfully" });
  } catch (e) {
    res.status(401).json({ message: "product creation failed" });
  }
});

router.get("/products", async function (req, res) {
  try {
    const getAllProducts = await Product.find();
    console.log(getAllProducts, "user successfully logged in");
    res.status(200).json(getAllProducts);
  } catch (e) {
    res.status(500).json({ message: "login failed" });
  }
});
module.exports = router;
