import React, { useState } from "react";

const Admin = () => {
  // Regular Product States
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Discount Product States
  const [discountProductName, setDiscountProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountCategory, setDiscountCategory] = useState("");
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountImage, setDiscountImage] = useState("");

  // Weekly Special Product States
  const [weeklySpecialProductName, setWeeklySpecialProductName] = useState("");
  const [weeklySpecialPrice, setWeeklySpecialPrice] = useState("");
  const [weeklySpecialCategory, setWeeklySpecialCategory] = useState("");
  const [weeklySpecialDescription, setWeeklySpecialDescription] = useState("");
  const [weeklySpecialImage, setWeeklySpecialImage] = useState("");
  const [weeklySpecialStock, setWeeklySpecialStock] = useState("");
  const [weeklySpecialLimitedTime, setWeeklySpecialLimitedTime] = useState("");

  // Handle adding a regular product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        price,
        category,
        description,
        image,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Product Added Successfully");
      setProductName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage("");
    } else {
      alert(data.message);
    }
  };

  // Handle adding a discount product
  const handleAddDiscountProduct = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/discountproducts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: discountProductName,
        originalPrice,
        discountPercentage,
        category: discountCategory,
        description: discountDescription,
        image: discountImage,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Discount Product Added Successfully");
      setDiscountProductName("");
      setOriginalPrice("");
      setDiscountPercentage("");
      setDiscountCategory("");
      setDiscountDescription("");
      setDiscountImage("");
    } else {
      alert(data.message);
    }
  };

  // Handle adding a weekly special product
  const handleAddWeeklySpecial = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/weeklyspecial/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: weeklySpecialProductName,
        price: weeklySpecialPrice,
        category: weeklySpecialCategory,
        description: weeklySpecialDescription,
        image: weeklySpecialImage,
        stock: weeklySpecialStock,
        limitedTime: weeklySpecialLimitedTime,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Weekly Special Product Added Successfully");
      setWeeklySpecialProductName("");
      setWeeklySpecialPrice("");
      setWeeklySpecialCategory("");
      setWeeklySpecialDescription("");
      setWeeklySpecialImage("");
      setWeeklySpecialStock("");
      setWeeklySpecialLimitedTime("");
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.mainTitle}>Admin Panel</h2>
      <div style={styles.formsContainer}>
        {/* Regular Product Form */}
        <div style={styles.formBox}>
          <h3 style={styles.sectionTitle}>Add Product</h3>
          <form onSubmit={handleAddProduct} style={styles.form}>
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={styles.input}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.textarea}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Add Product
            </button>
          </form>
        </div>

        {/* Discount Product Form */}
        <div style={styles.formBox}>
          <h3 style={styles.sectionTitle}>Add Discount Product</h3>
          <form onSubmit={handleAddDiscountProduct} style={styles.form}>
            <input
              type="text"
              placeholder="Discount Product Name"
              value={discountProductName}
              onChange={(e) => setDiscountProductName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Original Price"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Discount Percentage"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Category"
              value={discountCategory}
              onChange={(e) => setDiscountCategory(e.target.value)}
              required
              style={styles.input}
            />
            <textarea
              placeholder="Description"
              value={discountDescription}
              onChange={(e) => setDiscountDescription(e.target.value)}
              required
              style={styles.textarea}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={discountImage}
              onChange={(e) => setDiscountImage(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Add Discount Product
            </button>
          </form>
        </div>

        {/* Weekly Special Product Form */}
        <div style={styles.formBox}>
          <h3 style={styles.sectionTitle}>Add Weekly Special Product</h3>
          <form onSubmit={handleAddWeeklySpecial} style={styles.form}>
            <input
              type="text"
              placeholder="Weekly Special Product Name"
              value={weeklySpecialProductName}
              onChange={(e) => setWeeklySpecialProductName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Price"
              value={weeklySpecialPrice}
              onChange={(e) => setWeeklySpecialPrice(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Category"
              value={weeklySpecialCategory}
              onChange={(e) => setWeeklySpecialCategory(e.target.value)}
              required
              style={styles.input}
            />
            <textarea
              placeholder="Description"
              value={weeklySpecialDescription}
              onChange={(e) => setWeeklySpecialDescription(e.target.value)}
              required
              style={styles.textarea}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={weeklySpecialImage}
              onChange={(e) => setWeeklySpecialImage(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Stock"
              value={weeklySpecialStock}
              onChange={(e) => setWeeklySpecialStock(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Limited Time (Hours)"
              value={weeklySpecialLimitedTime}
              onChange={(e) => setWeeklySpecialLimitedTime(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Add Weekly Special Product
            </button>
          </form>
        </div>
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
  formsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: "30px",
    width: "100%",
  },
  formBox: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(25, 4, 53, 0.15)",
    textAlign: "center",
    width: "400px",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  formBoxHover: {
    transform: "scale(1.03)",
  },
  sectionTitle: {
    marginBottom: "25px",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#34495e",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border 0.3s",
    fontSize: "14px",
  },
  inputFocus: {
    border: "1px solid #007BFF",
    boxShadow: "0px 0px 5px rgba(0, 123, 255, 0.5)",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "none",
    outline: "none",
    transition: "border 0.3s",
    fontSize: "14px",
    minHeight: "100px",
  },
  textareaFocus: {
    border: "1px solid #007BFF",
    boxShadow: "0px 0px 5px rgba(0, 123, 255, 0.5)",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #007BFF, #0056D2)",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.3s",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "bold",
  },
  buttonHover: {
    background: "linear-gradient(90deg, #0056D2, #003BB3)",
    transform: "translateY(-2px)",
  },
};

export default Admin;
