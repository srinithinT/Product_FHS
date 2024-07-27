import { useState } from "react";
// import "../styles/LoginPage.css";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
function LoginPage({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login({ email, password });
      console.log(token, "response from signup");
      setToken(token);
      navigate("/products");
    } catch (e) {
      console.log(e, "error message in signup");
      setError(e.message);
    }
  };
  return (
    <div className="signupContainer">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form className="signupContainer" onSubmit={handleSubmit}>
        <div className="label-input">
          <label>Email</label>
          <input
            type="text"
            placeholder="eg: abc@gmail.com"
            required
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="label-input">
          <label>Email</label>
          <input
            type="text"
            placeholder="password"
            required
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
