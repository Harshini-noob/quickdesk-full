// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dummyUsers = [
    { email: "user@example.com", password: "1234", role: "user" },
    { email: "admin@example.com", password: "admin", role: "admin" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const found = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      localStorage.setItem("user", JSON.stringify(found));
      if (found.role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>Try: user@example.com / 1234 or admin@example.com / admin</p>
      </form>
    </div>
  );
};

export default Login;
