import React from "react";
import DiscountProducts from "./DiscountProducts";
import WeeklySpecial from "./WeeklySpecial";

const Home = () => {
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  // };

  return (
    <div style={styles.container}>
      {/* Video Background */}
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src="/assets/login-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for Readability */}
      <div style={styles.overlay}>
        {/* Header Section */}
        <header style={styles.header}>
          <div style={styles.logo}>Tech Gadgets Store</div>
          <nav style={styles.nav}>
            <a href="/productlist" style={styles.link}>Product List</a>
            <a href="/profile" style={styles.link}>Profile</a>
            <a href="/login" style={styles.link}>Login</a>
            <a href="/register" style={styles.link}>Register</a>
            {/* <button onClick={handleLogout} style={styles.logoutButton}>Logout</button> */}
          </nav>
        </header>

        {/* Main Content */}
        <main style={styles.mainContent}>
          <h1 style={styles.mainTitle}>Welcome to Tech Gadgets Store</h1>
          <p style={styles.subTitle}>Your one-stop solution for the latest tech gadgets!</p>

          {/* Discount Products Section */}
          <section style={styles.section}>
            <DiscountProducts />
          </section>

          {/* Weekly Special Section */}
          <section style={styles.section}>
            <WeeklySpecial />
          </section>
        </main>

        {/* Footer Section */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            {/* Contact Info */}
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Contact Us</h3>
              <p>📍 123 Tech Street, Silicon Valley, CA</p>
              <p>📞 +1 234 567 890</p>
              <p>✉ support@techgadgets.com</p>
            </div>

            {/* Follow Us */}
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Follow Us</h3>
              <div style={styles.socialIcons}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>📘 Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>🐦 Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>📸 Instagram</a>
              </div>
            </div>

            {/* Quick Links */}
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Quick Links</h3>
              <a href="/about" style={styles.quickLink}>About Us</a>
              <a href="/terms" style={styles.quickLink}>Terms & Conditions</a>
              <a href="/privacy" style={styles.quickLink}>Privacy Policy</a>
            </div>
          </div>

          {/* Copyright */}
          <p style={styles.footerText}>© 2025 Tech Gadgets Store. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  container: {
    position: "relative",
    minHeight: "100vh", // Allow scrolling when content overflows
    fontFamily: "'Arial', sans-serif",
  },
  videoBackground: {
    position: "fixed", // Keep video fixed in the background
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: "-1",
  },
  overlay: {
    position: "relative",
    background: "rgba(0, 0, 0, 0.4)", // Dark overlay for readability
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh", // Ensure content expands naturally
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 50px",
    background: "rgba(52, 58, 64, 0.8)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    position: "sticky",
    top: "0",
    zIndex: "10",
  },
  logo: {
    fontSize: "26px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    margin: "0 15px",
    textDecoration: "none",
    color: "#f8f9fa",
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
  logoutButton: {
    padding: "10px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  mainContent: {
    padding: "50px",
    textAlign: "center",
  },
  mainTitle: {
    fontSize: "36px",
    color: "#fff",
    marginBottom: "10px",
  },
  subTitle: {
    fontSize: "20px",
    color: "#f8f9fa",
    marginBottom: "40px",
  },
  section: {
    marginBottom: "50px",
  },
  footer: {
    padding: "30px 50px",
    background: "rgba(52, 58, 64, 0.8)",
    textAlign: "center",
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1000px",
    margin: "0 auto",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },
  footerSection: {
    flex: "1",
    minWidth: "250px",
    marginBottom: "20px",
  },
  footerTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  socialIcons: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  icon: {
    textDecoration: "none",
    color: "#f8f9fa",
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
  quickLink: {
    display: "block",
    textDecoration: "none",
    color: "#f8f9fa",
    fontSize: "16px",
    marginBottom: "5px",
    transition: "color 0.3s ease",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
  },
};

export default Home;
