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
        console.log(data.product, setCart, "data from cart");
        setCart(data.product);
      } catch (e) {
        console.log(e, "failed to fetch the cart");
      }
    };
    fetchCart();
  }, [token]);

  const handleRemoveCart = async (productId) => {
    try {
      await removeFromCart(token, productId);
      setCart(cart.filter((item) => item.productId !== productId));
    } catch (e) {
      console.log(e, "error in removing products from cart");
    }
  };
  console.log(cart, "cartcart");
  return (
    <div className="cart-page-container">
      <h2>Your Cart</h2>
      {cart?.length === 0 ? (
        <p className="empty-cart-message">No items in your cart.</p>
      ) : (
        <ul className="cart-items-list">
          {cart.map((item) => (
            <li key={item.productId} className="cart-item">
              <h3>{item.name}</h3>
              <p>{item.quantity}</p>
              <button className="remove-button" onClick={() => handleRemoveCart(item.productId)}>
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
