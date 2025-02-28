import React, { useState } from "react";

const Payment = () => {
  // Customer Information States
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Card Payment States
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Google UPI State
  const [upiId, setUpiId] = useState("");

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy processing logic (you can integrate with a real payment gateway)
    let paymentDetails = {
      name,
      mobile,
      address,
      paymentMethod,
    };

    if (paymentMethod === "card") {
      paymentDetails = { ...paymentDetails, cardNumber, expiry, cvv };
    } else if (paymentMethod === "google_upi") {
      paymentDetails = { ...paymentDetails, upiId };
    }

    console.log("Processing Payment:", paymentDetails);
    alert(`Payment Successful using ${paymentMethod.toUpperCase()}!`);
    
    // Reset the form (if required)
    setName("");
    setMobile("");
    setAddress("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setUpiId("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Payment Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Customer Information */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={styles.textarea}
        />

        {/* Payment Method Options */}
        <div style={styles.paymentOptions}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Card
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="paymentMethod"
              value="google_upi"
              checked={paymentMethod === "google_upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Google UPI
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="paymentMethod"
              value="gpay_qr"
              checked={paymentMethod === "gpay_qr"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            GPay QR
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Cash on Delivery
          </label>
        </div>

        {/* Conditional Rendering Based on Payment Method */}
        {paymentMethod === "card" && (
          <div style={styles.methodContainer}>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        )}

        {paymentMethod === "google_upi" && (
          <div style={styles.methodContainer}>
            <input
              type="text"
              placeholder="Google UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        )}

        {paymentMethod === "gpay_qr" && (
          <div style={styles.methodContainer}>
            <p style={styles.infoText}>
              Scan the QR code below with your GPay app
            </p>
            <img
              src="https://via.placeholder.com/150?text=GPay+QR"
              alt="GPay QR Code"
              style={styles.qrImage}
            />
          </div>
        )}

        {paymentMethod === "cod" && (
          <div style={styles.methodContainer}>
            <p style={styles.infoText}>
              You have selected Cash on Delivery.
            </p>
          </div>
        )}

        <button type="submit" style={styles.button}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "none",
    minHeight: "80px",
  },
  paymentOptions: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  radioLabel: {
    fontSize: "16px",
    color: "#333",
  },
  methodContainer: {
    marginBottom: "20px",
  },
  infoText: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#555",
  },
  qrImage: {
    display: "block",
    margin: "0 auto",
    width: "150px",
    height: "150px",
  },
  button: {
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Payment;
