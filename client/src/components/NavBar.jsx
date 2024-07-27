import { Link } from "react-router-dom";
import "../styles/NavBar.css";
function NavBar({ token, onLogout }) {
  return (
    <nav className="navbar">
      <Link to={"/"} className="nav-link">
        Home
      </Link>

      {token ? (
        <>
          <Link to={"/products"} className="nav-link">
            Products
          </Link>
          <Link to={"/cart"} className="nav-link">
            Cart
          </Link>
          <Link to={"/profile"} className="nav-link">
            Profile
          </Link>
          <button className="logout" onClick={onLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to={"/signup"} className="nav-link">
            Sign Up
          </Link>
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
