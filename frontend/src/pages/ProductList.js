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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Products</h2>
      <div style={styles.productList}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <img
                src={product.image}
                alt={product.productName}
                style={styles.productImage}
              />
              <h3>{product.productName}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Category: {product.category}</p>
              <p>{product.description}</p>
              <button
                style={styles.button}
                onClick={() => navigate("/payment")}
              >
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p>No products available</p>
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
  },
  productImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ProductList;
