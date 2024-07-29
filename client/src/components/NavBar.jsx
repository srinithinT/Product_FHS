import { Link } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar({ token, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={"/"} className="nav-link home-button">
          Home
        </Link>

        {token ? (
          <div className="nav-links">
            <Link to={"/products"} className="nav-link">
              Products
            </Link>
            <Link to={"/cart"} className="nav-link">
              Cart
            </Link>
            <Link to={"/profile"} className="nav-link">
              Profile
            </Link>
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="nav-links">
            <Link to={"/signup"} className="nav-link">
              Sign Up
            </Link>
            <Link to={"/login"} className="nav-link login-button">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
