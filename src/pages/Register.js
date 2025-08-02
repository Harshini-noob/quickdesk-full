// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "user" });

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email: form.email,
      password: form.password,
      role: form.role,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    navigate(form.role === "agent" ? "/agent/dashboard" : "/user/dashboard");
  };

  return (
    <div className="login-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
