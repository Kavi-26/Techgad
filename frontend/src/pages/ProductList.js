import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        alert("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleBuyNow = (product) => {
    navigate("/paymentss", { state: { product } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tech Gadgets Store</h2>
      <div style={styles.productList}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <img
                src={product.image}
                alt={product.productName}
                style={styles.productImage}
              />
              <h3 style={styles.productName}>{product.productName}</h3>
              <div style={styles.categoryBadge}>{product.category}</div>
              <p style={styles.description}>{product.description}</p>
              <p style={styles.price}>₹{product.price}</p>
              <button style={styles.button} onClick={() => handleBuyNow(product)}>
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noProducts}>No products available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    background: "linear-gradient(to right,rgb(230, 233, 236), #00BFFF)",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "40px",
    textAlign: "center",
    marginBottom: "40px",
    color: "blue",
    textTransform: "uppercase",
    letterSpacing: "3px",
    background: "linear-gradient(to right, #007BFF, #00BFFF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    justifyContent: "center",
    padding: "20px",
  },
  productCard: {
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  productCardHover: {
    transform: "translateY(-10px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
  },
  productImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  productName: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: "20px",
  },
  categoryBadge: {
    display: "inline-block",
    padding: "5px 15px",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "20px",
    fontSize: "14px",
    marginBottom: "15px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s ease, transform 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
  },
  noProducts: {
    textAlign: "center",
    fontSize: "20px",
    color: "#777",
  },
};

export default ProductList;
