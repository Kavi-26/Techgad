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
          <a href="/productlist" style={linkStyle}>ProductList</a>
          <a href="/admin" style={linkStyle}>Admin</a>
          <a href="/profile" style={linkStyle}>Profile</a>
          <a href="/login" style={linkStyle}>Login</a>
          <a href="/register" style={linkStyle}>Register</a>
          <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <h1 style={mainTitleStyle}>Welcome to Tech Gadgets Store</h1>
        <p style={subTitleStyle}>Your one-stop solution for the latest tech gadgets!</p>

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
        <div style={footerContentStyle}>
          {/* Contact Info */}
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>Contact Us</h3>
            <p>📍 123 Tech Street, Silicon Valley, CA</p>
            <p>📞 +1 234 567 890</p>
            <p>✉ support@techgadgets.com</p>
          </div>

          {/* Follow Us */}
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>Follow Us</h3>
            <div style={socialIconsStyle}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>📘 Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>🐦 Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>📸 Instagram</a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>Quick Links</h3>
            <a href="/about" style={quickLinkStyle}>About Us</a>
            <a href="/terms" style={quickLinkStyle}>Terms & Conditions</a>
            <a href="/privacy" style={quickLinkStyle}>Privacy Policy</a>
          </div>
        </div>

        {/* Copyright */}
        <p style={footerTextStyle}>© 2025 Tech Gadgets Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const containerStyle = {
  fontFamily: "'Arial', sans-serif",
  background: "linear-gradient(to right,rgb(230, 233, 236), #00BFFF)",
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
  padding: "30px 50px",
  background: "#343a40",
  color: "#f8f9fa",
  textAlign: "center",
};

const footerContentStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  maxWidth: "1000px",
  margin: "0 auto",
  paddingBottom: "20px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
};

const footerSectionStyle = {
  flex: "1",
  minWidth: "250px",
  marginBottom: "20px",
};

const footerTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#f8f9fa",
};

const socialIconsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const iconStyle = {
  textDecoration: "none",
  color: "#f8f9fa",
  fontSize: "16px",
  transition: "color 0.3s ease",
};

const quickLinkStyle = {
  display: "block",
  textDecoration: "none",
  color: "#f8f9fa",
  fontSize: "16px",
  marginBottom: "5px",
  transition: "color 0.3s ease",
};

const footerTextStyle = {
  marginTop: "20px",
  fontSize: "14px",
};

export default Home;
