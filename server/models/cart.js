const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
