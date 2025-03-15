import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const WeeklySpecial = () => {
  const [weeklySpecials, setWeeklySpecials] = useState([]);
  const [timers, setTimers] = useState({});
  const navigate = useNavigate();

  // Fetch weekly specials
  const fetchWeeklySpecials = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/weeklyspecial");
      const data = await response.json();
      if (response.ok) {
        setWeeklySpecials(data);
        initializeTimers(data);
      } else {
        alert("Failed to fetch weekly special products");
      }
    } catch (error) {
      console.error("Error fetching weekly special products:", error);
    }
  }, []);

  useEffect(() => {
    fetchWeeklySpecials();
  }, [fetchWeeklySpecials]);

  // Initialize countdown timers
  const initializeTimers = (products) => {
    const newTimers = {};
    products.forEach((product) => {
      if (product.limitedTime > 0) {
        const endTime = Date.now() + product.limitedTime * 60 * 60 * 1000; // Convert hours to milliseconds
        newTimers[product._id] = endTime;
      }
    });
    setTimers(newTimers);
  };

  // Update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
        Object.keys(updatedTimers).forEach((id) => {
          const timeLeft = updatedTimers[id] - Date.now();
          if (timeLeft <= 0) {
            delete updatedTimers[id]; // Remove expired timers
          }
        });
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Format time in HH:MM:SS
  const formatTime = (endTime) => {
    const timeLeft = endTime - Date.now();
    if (timeLeft <= 0) return "00:00:00";

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handlePayment = (product) => {
    navigate("/payment", { state: { product } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔥 Weekly Special Products</h2>
      <div style={styles.productList}>
        {weeklySpecials.length > 0 ? (
          weeklySpecials.map((product) => {
            const timer = timers[product._id];
            const isExpired = !timer || timer <= Date.now();

            return (
              <div key={product._id} style={styles.productCard}>
                <div style={styles.imageContainer}>
                  <img src={product.image} alt={product.productName} style={styles.productImage} />
                  {timer && !isExpired && (
                    <span style={styles.limitedTimeTag}>⏳ {formatTime(timer)} Left</span>
                  )}
                </div>
                <h3 style={styles.productName}>{product.productName}</h3>
                <p style={styles.price}>Price: ₹{product.price}</p>
                <ul style={styles.description}>
                  {product.description.split(",").map((point, index) => (
                    <li key={index}>{point.trim()}</li>
                  ))}
                </ul>
                {product.stock > 0 && !isExpired ? (
                  <button style={styles.paymentButton} onClick={() => handlePayment(product)}>
                    Buy Now
                  </button>
                ) : (
                  <p style={styles.outOfStock}>{isExpired ? "Offer Expired" : "Out of Stock"}</p>
                )}
              </div>
            );
          })
        ) : (
          <p style={styles.noProducts}>No Weekly Special Products Available</p>
        )}
      </div>
    </div>
  );
};

// Updated Styles
const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    background: "linear-gradient(to right,rgb(230, 233, 236), #00BFFF)",
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
