import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded Admin Credentials
  const adminEmail = "admin@techgadgets.com";
  const adminPassword = "Admin@123"; // Change this as needed

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("adminToken", "admin_logged_in");
      navigate("/admin");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h2>Admin Login</h2>
        {error && <p style={errorStyle}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to right, #1e3c72, #2a5298)",
};

const loginBoxStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  width: "320px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "18px",
};

const errorStyle = {
  color: "red",
  fontSize: "14px",
};

export default AdminLogin;
