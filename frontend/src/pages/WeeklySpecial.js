import React, { useEffect, useState } from "react";

const WeeklySpecial = () => {
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    fetchWeeklySpecials();
  }, []);

  const fetchWeeklySpecials = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/weeklyspecial");
      const data = await response.json();
      if (response.ok) {
        setSpecials(data);
      } else {
        alert("Failed to fetch weekly special products");
      }
    } catch (error) {
      console.error("Error fetching weekly special products:", error);
    }
  };

  // Countdown Timer
  const getRemainingTime = (createdAt, limitedTime) => {
    const createdDate = new Date(createdAt);
    const expiryDate = new Date(createdDate.getTime() + limitedTime * 60 * 60 * 1000);
    const now = new Date();
    const remaining = expiryDate - now;

    if (remaining <= 0) {
      return "Expired";
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m Remaining`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Weekly Specials</h2>
      <div style={styles.productList}>
        {specials.length > 0 ? (
          specials.map((product) => (
            <div
              key={product._id}
              style={{
                ...styles.productCard,
                opacity: product.stock === 0 ? 0.5 : 1,
                pointerEvents: product.stock === 0 ? "none" : "auto",
              }}
            >
              <img
                src={product.image}
                alt={product.productName}
                style={styles.productImage}
              />
              <h3>{product.productName}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Category: {product.category}</p>
              <p>{product.description}</p>
              <p>Stock: {product.stock} left</p>
              <p style={{ color: "red" }}>
                {getRemainingTime(product.createdAt, product.limitedTime)}
              </p>
              {product.stock > 0 && (
                <button style={styles.buyButton}>Buy Now</button>
              )}
            </div>
          ))
        ) : (
          <p>No weekly specials available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  productList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  productCard: {
    width: "300px",
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "0.3s",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  buyButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default WeeklySpecial;
