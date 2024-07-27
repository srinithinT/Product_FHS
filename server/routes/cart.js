const express = require("express");
const Product = require("../models/product");
const Cart = require("../models/cart");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/cart", authMiddleware, async function (req, res) {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    let cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      const productIndex = cart.product.findIndex((p) => {
        p.productId.toString() == productId;
      });
      if (productIndex > -1) {
        let productItem = cart.product[productIndex];
        productItem.quantity += quantity;
        cart.product[productIndex] = productItem;
      } else {
        cart.product.push({ productId, quantity });
      }
      cart = await cart.save;
    } else {
      const newCart = await Cart.create({
        userId: req.user._id,
        product: [{ productId, quantity }],
      });
      cart = newCart;
    }
    console.log(typeof quantity, typeof product.quantity, product.quantity, quantity, "fe");
    product.quantity -= quantity;
    await product.save();
  } catch (e) {
    res.status(401).json({ message: "product creation failed" + e });
  }
});

router.get("/cart", authMiddleware, async function (req, res) {
  try {
    const getAllCart = await Cart.findOne({ userId: req.user._id }).populate("product.productId");
    console.log(getAllCart, "getallcart");
    if (getAllCart) {
      res.status(200).json(getAllCart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "An error occurred while fetching the cart", error: e });
  }
});
module.exports = router;
