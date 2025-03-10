import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const WeeklySpecial = () => {
  const [weeklySpecials, setWeeklySpecials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWeeklySpecials();
  }, []);
  
  const fetchWeeklySpecials = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/weeklyspecial");
      const data = await response.json();
      if (response.ok) {
        setWeeklySpecials(data);
      } else {
        alert("Failed to fetch weekly special products");
      }
    } catch (error) {
      console.error("Error fetching weekly special products:", error);
    }
  };

  const handlePayment = (product) => {
    navigate("/payment", { state: { product } });
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔥 Weekly Special Products</h2>
      <div style={styles.productList}>
        {weeklySpecials.length > 0 ? (
          weeklySpecials.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <div style={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.productName}
                  style={styles.productImage}
                />
                {product.limitedTime && (
                  <span style={styles.limitedTimeTag}>
                    ⏰ {product.limitedTime} Hours Left
                  </span>
                )}
              </div>
              <h3 style={styles.productName}>{product.productName}</h3>
              <p style={styles.price}>Price: ₹{product.price}</p>
              <ul style={styles.description}>
                {product.description.split(",").map((point, index) => (
                  <li key={index}>{point.trim()}</li>
                ))}
              </ul>
              {/* <p style={styles.stock}>Stock: {product.stock}</p> */}
              {product.stock > 0 ? (
                <button
                  style={styles.paymentButton}
                  onClick={() => handlePayment(product)}
                >
                  Buy Now
                </button>
              ) : (
                <p style={styles.outOfStock}>Out of Stock</p>
              )}
            </div>
          ))
        ) : (
          <p style={styles.noProducts}>No Weekly Special Products Available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    background: "#f0f4f8",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "36px",
    color: "#2c3e50",
    marginBottom: "40px",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  productList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
  productCard: {
    width: "320px",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "15px",
  },
  productImage: {
    width: "250px",
    height: "250px",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
  },
  limitedTimeTag: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "#ff4d4d",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "14px",
    letterSpacing: "1px",
  },
  productName: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  price: {
    fontSize: "20px",
    color: "#007BFF",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  description: {
    textAlign: "left",
    padding: "0 20px",
    fontSize: "14px",
    color: "#555",
    listStyleType: "disc",
    marginBottom: "20px",
  },
  stock: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  paymentButton: {
    padding: "10px 20px",
    borderRadius: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
    border: "none",
  },
  outOfStock: {
    color: "#ff4d4d",
    fontWeight: "bold",
    marginTop: "10px",
  },
  noProducts: {
    fontSize: "20px",
    color: "#333",
  },
};

export default WeeklySpecial;
