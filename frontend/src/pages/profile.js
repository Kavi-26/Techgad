import React, { useEffect, useState } from "react";

const Profile = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  // User details
  const user = {
    name: "KAVI",
    email: "kavi@gmail.com",
    mobile: "+91 9876543210",
    address: "123, Tech Street, Chennai, India",
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF33FZymMUNM3nuovGCYrV_80Duuyx4jLYxw&s",
  };

  // Fetch order history from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrderHistory(storedOrders);
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Profile</h2>
      <div style={styles.card}>
        <img src={user.profileImage} alt="Profile" style={styles.profileImage} />
        <div style={styles.details}>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>
        {/* Logout Button */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Order History Section */}
      <div style={styles.orderHistory}>
        <h2 style={styles.sectionTitle}>Order History</h2>
        {orderHistory.length > 0 ? (
          <div style={styles.orderList}>
            {orderHistory.map((order, index) => (
              <div key={index} style={styles.orderCard}>
                <img src={order.image} alt={order.productName} style={styles.orderImage} />
                <div style={styles.orderDetails}>
                  <h3>{order.productName}</h3>
                  <p style={styles.price}>₹{order.price}</p>
                  <p style={styles.categoryBadge}>{order.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noOrders}>No previous orders found</p>
        )}
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    color: "#333",
  },
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
    border: "2px solid #007BFF",
  },
  details: {
    textAlign: "left",
    lineHeight: "1.8",
    fontSize: "18px",
    color: "#555",
  },
  logoutButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  orderHistory: {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
    color: "#007BFF",
  },
  orderList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },
  orderCard: {
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#f1f1f1",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  orderImage: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  orderDetails: {
    fontSize: "16px",
    color: "#333",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: "5px",
  },
  categoryBadge: {
    display: "inline-block",
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "5px",
    fontSize: "12px",
  },
  noOrders: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
};

export default Profile;
