import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration Successful");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Video Background */}
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src="/assets/login-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Blur Overlay */}
      <div style={styles.overlay}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Register</h2>
          <form onSubmit={handleRegister} style={styles.form}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>
          <p style={styles.loginText}>
            Already have an account?{" "}
            <a href="/login" style={styles.link}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  videoBackground: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: "-1",
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(6px)", // Blur effect for readability
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Slight overlay for contrast
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent form
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "340px",
    backdropFilter: "blur(15px)", // Glassmorphism effect
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  title: {
    marginBottom: "15px",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
    
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent input fields
    color: "white",
    fontSize: "16px",
    outline: "none",
    
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  loginText: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#fff",
  },
  link: {
    color: "#00BFFF",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
