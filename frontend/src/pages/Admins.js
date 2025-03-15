import React, { useState, useEffect } from "react";

const Admin = () => {
  // Regular Product States
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);

  // Discount Product States
  const [discountProductName, setDiscountProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountCategory, setDiscountCategory] = useState("");
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountImage, setDiscountImage] = useState("");
  const [discountStock, setDiscountStock] = useState("");
  const [discountProducts, setDiscountProducts] = useState([]);

  // Weekly Special Product States
  const [weeklySpecialProductName, setWeeklySpecialProductName] = useState("");
  const [weeklySpecialPrice, setWeeklySpecialPrice] = useState("");
  const [weeklySpecialCategory, setWeeklySpecialCategory] = useState("");
  const [weeklySpecialDescription, setWeeklySpecialDescription] = useState("");
  const [weeklySpecialImage, setWeeklySpecialImage] = useState("");
  const [weeklySpecialStock, setWeeklySpecialStock] = useState("");
  const [weeklySpecialLimitedTime, setWeeklySpecialLimitedTime] = useState("");
  const [weeklySpecialProducts, setWeeklySpecialProducts] = useState([]);

  // Fetch all products from the database
  useEffect(() => {
    fetchProducts();
    fetchDiscountProducts();
    fetchWeeklySpecials();
  }, []);

  // Fetch regular products
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();
    setProducts(data);
  };

  // Fetch discount products
  const fetchDiscountProducts = async () => {
    const response = await fetch("http://localhost:5000/api/discountproducts");
    const data = await response.json();
    setDiscountProducts(data);
  };

  // Fetch weekly special products
  const fetchWeeklySpecials = async () => {
    const response = await fetch("http://localhost:5000/api/weeklyspecial");
    const data = await response.json();
    setWeeklySpecialProducts(data);
  };

  // Handle deleting a regular product
  const handleDeleteProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Product Deleted Successfully");
      fetchProducts();
    } else {
      alert("Failed to delete product");
    }
  };

  // Handle deleting a discount product
  const handleDeleteDiscountProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/api/discountproducts/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Discount Product Deleted Successfully");
      fetchDiscountProducts();
    } else {
      alert("Failed to delete discount product");
    }
  };

  // Handle deleting a weekly special product
  const handleDeleteWeeklySpecial = async (id) => {
    const response = await fetch(`http://localhost:5000/api/weeklyspecial/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Weekly Special Product Deleted Successfully");
      fetchWeeklySpecials();
    } else {
      alert("Failed to delete weekly special product");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.mainTitle}>Admin Panel</h2>
      
      {/* Display Regular Products */}
      <div style={styles.productList}>
        <h3>Regular Products</h3>
        {products.map((product) => (
          <div key={product._id} style={styles.productItem}>
            <span>{product.productName} - ${product.price}</span>
            <button onClick={() => handleDeleteProduct(product._id)} style={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>

      {/* Display Discount Products */}
      <div style={styles.productList}>
        <h3>Discount Products</h3>
        {discountProducts.map((product) => (
          <div key={product._id} style={styles.productItem}>
            <span>{product.productName} - {product.discountPercentage}% off</span>
            <button onClick={() => handleDeleteDiscountProduct(product._id)} style={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>

      {/* Display Weekly Special Products */}
      <div style={styles.productList}>
        <h3>Weekly Special Products</h3>
        {weeklySpecialProducts.map((product) => (
          <div key={product._id} style={styles.productItem}>
            <span>{product.productName} - ${product.price}</span>
            <button onClick={() => handleDeleteWeeklySpecial(product._id)} style={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(135deg,rgb(172, 192, 231),rgb(41, 54, 98))",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  mainTitle: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "40px",
    color: "#2c3e50",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: "bold",
  },
  productList: {
    width: "80%",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  productItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  deleteButton: {
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    background: "#e74c3c",
    color: "white",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Admin;
