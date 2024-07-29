import React, { useState } from "react";
import "../styles/Login.css";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { token } = await login({ email, password });
      console.log(token, "response from login");
      setToken(token);
      navigate("/products");
    } catch (e) {
      console.log(e, "error message in login");
      toast.error("Invalid email or password");
      setError(e.message);
    }
  };
  console.log(email, password, "credentials");
  return (
    <div className="loginContainer">
      <h2 className="loginTitle">Login</h2>
      {error && <p className="errorMessage">{error}</p>}
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="label-input">
          <label className="inputLabel">Email</label>
          <input
            type="text"
            placeholder="eg: abc@gmail.com"
            className="formInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="label-input">
          <label className="inputLabel">Password</label>
          <input
            type="password"
            placeholder="password"
            className="formInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submitButton">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
