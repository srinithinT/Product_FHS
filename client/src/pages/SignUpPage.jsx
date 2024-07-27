import { useState } from "react";
import "../styles/Signuppage.css";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";
function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ username, email, password });
      console.log(response, "response from signup");
      navigate("/login");
    } catch (e) {
      console.log(e, "error message in signup");
      setError(e.message);
    }
  };
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form className="signupContainer" onSubmit={handleSubmit}>
        <div className="label-input">
          <label>UserName</label>
          <input
            type="text"
            name="UserName"
            placeholder="eg: kamal"
            required
            value={username}
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="label-input">
          <label>Email</label>
          <input
            type="text"
            placeholder="eg: abc@gmail.com"
            required
            value={email}
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="label-input">
          <label>Password</label>
          <input
            type="text"
            placeholder="password"
            required
            value={password}
            className="form-input"
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
