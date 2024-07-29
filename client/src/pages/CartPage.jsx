import { useContext, useEffect } from "react";
import { getCart, removeFromCart } from "../api/api";
import { CartContext } from "../components/CartContext";
import "../styles/cart.css";

function CartPage({ token }) {
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(token);
        setCart(data.product);
      } catch (e) {
        console.error("Failed to fetch the cart:", e);
      }
    };
    fetchCart();
  }, [token, setCart]);

  const handleRemoveCart = async (productId) => {
    try {
      await removeFromCart(token, productId);
      setCart(cart.filter((item) => item.productId._id !== productId));
    } catch (e) {
      console.error("Error removing product from cart:", e);
    }
  };

  return (
    <div className="cart-page-container">
      <h2>Your Cart</h2>
      {cart?.length === 0 ? (
        <p className="empty-cart-message">No items in your cart.</p>
      ) : (
        <ul className="cart-items-list">
          {cart.map((item) => (
            <li key={item.productId._id} className="cart-item">
              <div className="cart-item-details">
                <h3>{item.productId.name}</h3>
                <p>Quantity: {item.quantity || 1}</p>
                <p>Price: ${item.productId.price}</p>
              </div>
              <button className="remove-button" onClick={() => handleRemoveCart(item.productId._id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
