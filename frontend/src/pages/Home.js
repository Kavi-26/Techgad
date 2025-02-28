import React from "react";
import DiscountProducts from "./DiscountProducts";
import WeeklySpecial from "./WeeklySpecial";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <header style={headerStyle}>
        <div style={logoStyle}>Tech Gadgets Store</div>
        <nav style={navStyle}>
          <a href="/productlist" style={linkStyle}>
            ProductList
          </a>
          <a href="/admin" style={linkStyle}>
            Admin
          </a>
          <a href="/profile" style={linkStyle}>
            Profile
          </a>
          <a href="/login" style={linkStyle}>
            Login
          </a>
          <a href="/register" style={linkStyle}>
            Register
          </a>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <h1 style={mainTitleStyle}>Welcome to Tech Gadgets Store</h1>
        <p style={subTitleStyle}>
          Your one-stop solution for the latest tech gadgets!
        </p>

        {/* Discount Products Section */}
        <section style={sectionStyle}>
          <DiscountProducts />
        </section>

        {/* Weekly Special Section */}
        <section style={sectionStyle}>
          <WeeklySpecial />
        </section>
      </main>

      {/* Footer Section */}
      <footer style={footerStyle}>
        <p style={footerTextStyle}>
          © 2025 Tech Gadgets Store. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

const containerStyle = {
  fontFamily: "'Arial', sans-serif",
  background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
  minHeight: "100vh",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 50px",
  background: "#343a40",
  color: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
};

const logoStyle = {
  fontSize: "26px",
  fontWeight: "bold",
};

const navStyle = {
  display: "flex",
  alignItems: "center",
};

const linkStyle = {
  margin: "0 15px",
  textDecoration: "none",
  color: "#f8f9fa",
  fontSize: "16px",
  transition: "color 0.3s ease",
};

const logoutButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.3s ease",
};

const mainContentStyle = {
  padding: "50px",
  textAlign: "center",
};

const mainTitleStyle = {
  fontSize: "36px",
  color: "#212529",
  marginBottom: "10px",
};

const subTitleStyle = {
  fontSize: "20px",
  color: "#495057",
  marginBottom: "40px",
};

const sectionStyle = {
  marginBottom: "50px",
};

const footerStyle = {
  padding: "20px 50px",
  background: "#343a40",
  color: "#f8f9fa",
  textAlign: "center",
};

const footerTextStyle = {
  margin: 0,
  fontSize: "14px",
};

export default Home;
