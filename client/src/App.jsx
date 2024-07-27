import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useState } from "react";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import NavBar from "./components/NavBar";
import ProductListingPage from "./pages/ProductListingPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const handleLogin = (newToken) => {
    setToken(null);
    localStorage.setItem("token", newToken);
  };
  const handleLogOut = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <NavBar token={token} onLogout={handleLogOut} />
          <div className="app">
            <Routes>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage setToken={handleLogin} />} />
              <Route path="/products" element={<ProductListingPage token={token} setToken={handleLogin} />} />
              <Route path="/cart" element={<CartPage token={token} setToken={handleLogin} />} />
              <Route path="/profile" element={<ProfilePage token={token} />} />
              <Route
                path="/"
                element={token ? <ProductListingPage token={token} /> : <LoginPage setToken={handleLogin} />}
              />
              <Route path="*" element={<div>page not found</div>} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
