import React, { useState } from "react";
import "../styles/Signuppage.css";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await signup({ username, email, password });
      console.log(response, "response from signup");
      navigate("/login");
    } catch (e) {
      console.log(e, "error message in signup");
      toast.error("An error occurred during sign up");
      setError(e.message);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="label-input">
          <label className="input-label">Username</label>
          <input
            type="text"
            name="username"
            placeholder="eg: kamal"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="label-input">
          <label className="input-label">Email</label>
          <input
            type="email"
            placeholder="eg: abc@gmail.com"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="label-input">
          <label className="input-label">Password</label>
          <input
            type="password"
            placeholder="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
