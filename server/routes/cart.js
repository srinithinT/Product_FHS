const express = require("express");
const Product = require("../models/product");
const Cart = require("../models/cart");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/cart", authMiddleware, async function (req, res) {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let cart = await Cart.findOne({ userId: req.user._id });
    console.log(cart, "cart from backedn");
    if (cart) {
      const productIndex = cart.product.findIndex((p) => p._id.toString() === productId);
      if (productIndex > -1) {
        let productItem = cart.product[productIndex];
        productItem.quantity += quantity;
        cart.product[productIndex] = productItem;
      } else {
        cart.product.push({ productId, quantity });
      }
      cart = await cart.save();
    } else {
      const newCart = await Cart.create({
        userId: req.user._id,
        product: [{ productId, quantity }],
      });
      cart = newCart;
    }
    product.quantity -= quantity;
    await product.save();
    res.status(200).json(cart);
  } catch (e) {
    console.error("Failed to add to cart:", e);
    res.status(500).json({ message: "Failed to add product to cart" });
  }
});

router.delete("/cart/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.product.findIndex((p) => p.productId.toString() == productId);
    console.log(productIndex, "productIndex");
    if (productIndex > -1) {
      cart.product.splice(productIndex, 1);
      await cart.save();

      const product = await Product.findById(productId);
      if (product) {
        product.quantity += productQuantity;
        await product.save();
      }
      res.json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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
