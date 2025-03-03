import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [userDetails, setUserDetails] = useState({ name: "", mobile: "", address: "" });
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");

  if (!product) {
    return <h2 style={styles.error}>No Product Selected for Payment</h2>;
  }

  const calculateDiscountPrice = (originalPrice, discountPercentage) => {
    return (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(2);
  };

  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.mobile || !userDetails.address) {
      alert("Please fill all details");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/discountproducts/processpayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          paymentMethod,
          userDetails,
          ...(paymentMethod === "card" ? { cardDetails } : { upiId }),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Payment Successful!");
        navigate("/discountproducts");
      } else {
        alert(data.message || "Payment Failed");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Error");
    }
  };

  const handleUserChange = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  const handleCardChange = (e) => setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Payment Page</h2>
      <div style={styles.card}>
        <img src={product.image} alt={product.productName} style={styles.image} />
        <h3 style={styles.productName}>{product.productName}</h3>
        <p style={styles.originalPrice}>Original Price: <span style={styles.strikeThrough}>₹{product.originalPrice}</span></p>
        <p style={styles.discountedPrice}>Discounted Price: ₹{calculateDiscountPrice(product.originalPrice, product.discountPercentage)}</p>

        <div style={styles.formGroup}>
          <input type="text" name="name" placeholder="Name" value={userDetails.name} onChange={handleUserChange} />
          <input type="text" name="mobile" placeholder="Mobile Number" maxLength="10" value={userDetails.mobile} onChange={handleUserChange} />
          <textarea name="address" placeholder="Address" value={userDetails.address} onChange={handleUserChange} />
        </div>

        <div style={styles.paymentOptions}>
          {["card", "upi", "qr"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              style={{
                ...styles.paymentMethod,
                backgroundColor: paymentMethod === method ? "#007BFF" : "#f0f4f8",
                color: paymentMethod === method ? "white" : "#333",
              }}
            >
              {method === "card" ? "Card Payment" : method === "upi" ? "Google Pay UPI" : "Google Pay QR"}
            </button>
          ))}
        </div>

        {paymentMethod === "card" && (
          <div style={styles.cardForm}>
            <input type="text" name="cardNumber" placeholder="Card Number" maxLength="16" onChange={handleCardChange} />
            <input type="text" name="expiry" placeholder="Expiry (MM/YY)" maxLength="5" onChange={handleCardChange} />
            <input type="password" name="cvv" placeholder="CVV" maxLength="3" onChange={handleCardChange} />
          </div>
        )}

        {paymentMethod === "upi" && (
          <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} style={styles.input} />
        )}

        {paymentMethod === "qr" && (
          <div>
            <p>Scan QR Code:</p>
            <img src="https://via.placeholder.com/200" alt="Google Pay QR Code" style={styles.qrCode} />
          </div>
        )}

        <button style={styles.payButton} onClick={handlePayment}>
          Confirm Payment
        </button>
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
    color: "#333",
    marginBottom: "20px",
  },
  card: {
    padding: "30px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    display: "inline-block",
    textAlign: "center",
    width: "420px",
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  paymentOptions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  paymentMethod: {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  cardForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  qrCode: {
    width: "200px",
    marginBottom: "20px",
  },
  payButton: {
    padding: "12px 25px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  payButtonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "#ff4d4d",
    marginTop: "50px",
  },
};

export default Payments;
