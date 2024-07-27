import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addProductToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return <CartContext.Provider value={{ cart, setCart, addProductToCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
