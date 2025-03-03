import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [userDetails, setUserDetails] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  if (!product) {
    return <h2 style={styles.error}>No Product Selected for Payment</h2>;
  }

  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.mobile || !userDetails.address) {
      alert("Please fill all details");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/weeklyspecial/processpayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          userDetails,
          paymentMethod,
          ...(paymentMethod === "card" ? { cardDetails } : { upiId }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Payment Successful!");
        navigate("/weeklyspecial");
      } else {
        alert(data.message || "Payment Failed");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Error");
    }
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Payment Page</h2>
      <div style={styles.card}>
        <img src={product.image} alt={product.productName} style={styles.image} />
        <h3 style={styles.productName}>{product.productName}</h3>
        <p style={styles.price}>Price: ₹{product.price}</p>
        <p style={styles.stock}>Stock Left: {product.stock}</p>

        <div style={styles.formGroup}>
          <label>Name</label>
          <input type="text" name="name" value={userDetails.name} onChange={handleInputChange} style={styles.input} />

          <label>Mobile Number</label>
          <input type="text" name="mobile" value={userDetails.mobile} onChange={handleInputChange} maxLength="10" style={styles.input} />

          <label>Address</label>
          <textarea name="address" value={userDetails.address} onChange={handleInputChange} rows="3" style={styles.textarea}></textarea>
        </div>

        <div style={styles.paymentOptions}>
          <label>
            <input type="radio" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> Card Payment
          </label>
          <label>
            <input type="radio" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} /> Google Pay UPI
          </label>
          <label>
            <input type="radio" value="qr" checked={paymentMethod === "qr"} onChange={() => setPaymentMethod("qr")} /> Google Pay QR Code
          </label>
        </div>

        {paymentMethod === "card" && (
          <div style={styles.cardForm}>
            <label>Card Number</label>
            <input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} maxLength="16" style={styles.input} />

            <label>Expiry (MM/YY)</label>
            <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleCardChange} maxLength="5" style={styles.input} />

            <label>CVV</label>
            <input type="password" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} maxLength="3" style={styles.input} />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div style={styles.upiSection}>
            <label>UPI ID</label>
            <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} style={styles.input} />
          </div>
        )}

        {paymentMethod === "qr" && (
          <div style={styles.qrSection}>
            <p>Scan the QR Code using Google Pay:</p>
            <img src="https://via.placeholder.com/200" alt="Google Pay QR" style={styles.qrImage} />
          </div>
        )}

        <button style={styles.payButton} onClick={handlePayment}>Confirm Payment</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "36px",
    color: "#2c3e50",
    marginBottom: "40px",
  },
  card: {
    display: "inline-block",
    padding: "30px",
    borderRadius: "15px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    textAlign: "left",
    width: "420px",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  productName: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  price: {
    fontSize: "20px",
    color: "#007BFF",
    fontWeight: "bold",
  },
  stock: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "none",
  },
  paymentOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  cardForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  qrSection: {
    textAlign: "center",
    marginBottom: "20px",
  },
  qrImage: {
    width: "200px",
    height: "200px",
  },
  payButton: {
    padding: "12px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    transition: "0.3s",
  },
  error: {
    color: "#ff4d4d",
    fontSize: "24px",
    marginTop: "50px",
  },
};

export default Payment;
