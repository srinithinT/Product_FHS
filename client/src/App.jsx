import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useState } from "react";
import { CartProvider } from "./components/CartContext";
import NavBar from "./components/NavBar";
import ProductListingPage from "./pages/ProductListingPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (newToken) => {
    console.log(newToken, "newtoken", localStorage.getItem("token"));
    setToken(null);
    localStorage.setItem("token", newToken);
  };
  const handleLogOut = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  console.log(token, "toekn");
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar token={token} onLogout={handleLogOut} />
        <div className="app">
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage setToken={handleLogin} />} />
            <Route
              path="/products"
              element={
                token ? (
                  <ProductListingPage token={token} setToken={handleLogin} />
                ) : (
                  <LoginPage setToken={handleLogin} />
                )
              }
            />
            <Route path="/cart" element={<CartPage token={token} setToken={handleLogin} />} />
            <Route path="/profile" element={<ProfilePage token={token} />} />
            <Route
              path="/"
              element={token ? <ProductListingPage token={token} /> : <LoginPage setToken={handleLogin} />}
            />
            <Route path="*" element={<div>page not found</div>} />
          </Routes>
          <ToastContainer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
