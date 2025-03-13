import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const DiscountProducts = () => {
  const [discountProducts, setDiscountProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiscountProducts();
  }, []);
 
  const fetchDiscountProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/discountproducts");
      const data = await response.json();
      if (response.ok) {
        setDiscountProducts(data);
      } else {
        alert("Failed to fetch discount products");
      }
    } catch (error) {
      console.error("Error fetching discount products:", error);
    }
  };

  const calculateDiscountPrice = (originalPrice, discountPercentage) => {
    return (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(2);
  };

  const handlePayment = (product) => {
    navigate("/payments", { state: { product } });
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔥 Discount Products</h2>
      <div style={styles.productList}>
        {discountProducts.length > 0 ? (
          discountProducts.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <div style={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.productName}
                  style={styles.productImage}
                />
                <span style={styles.discountTag}>
                  {product.discountPercentage}% OFF
                </span>
              </div>
              <h3 style={styles.productName}>{product.productName}</h3>
              <p style={styles.originalPrice}>
                Original Price:
                <span style={styles.strikeThrough}>₹{product.originalPrice}</span>
              </p>
              <p style={styles.discountedPrice}>
                Discounted Price: ₹
                {calculateDiscountPrice(product.originalPrice, product.discountPercentage)}
              </p>
              <ul style={styles.description}>
                {product.description.split(",").map((point, index) => (
                  <li key={index}>{point.trim()}</li>
                ))}
              </ul>
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
          <p style={styles.noProducts}>No Discount Products Available</p>
        )}
      </div>
    </div>
  );
};

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
  productCardHover: {
    transform: "scale(1.05)",
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
  discountTag: {
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
  originalPrice: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "10px",
  },
  strikeThrough: {
    textDecoration: "line-through",
    color: "#999",
    marginLeft: "10px",
    fontWeight: "bold",
  },
  discountedPrice: {
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
  paymentButtonHover: {
    backgroundColor: "#218838",
  },
  noProducts: {
    fontSize: "20px",
    color: "#333",
  },
};

export default DiscountProducts;