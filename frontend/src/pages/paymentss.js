import React, { useState } from "react";

const Paymentss = ({ handlePayment, product }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      if (!cardNumber || !expiry || !cvv) {
        alert("Please fill all card details");
        return;
      }
    }

    if (paymentMethod === "google_upi" && !upiId) {
      alert("Please enter UPI ID");
      return;
    }

    alert(`Payment Successful using ${paymentMethod.toUpperCase()}`);
    handlePayment(product);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Payment Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
        </div>

        {paymentMethod === "card" && (
          <div>
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
          <input
            type="text"
            placeholder="Google UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
            style={styles.input}
          />
        )}

        {paymentMethod === "gpay_qr" && (
          <div style={styles.qrContainer}>
            <p>Scan the QR Code with your GPay app</p>
            <img
              src="https://via.placeholder.com/150?text=GPay+QR"
              alt="GPay QR Code"
              style={styles.qrImage}
            />
          </div>
        )}

        <button type="submit" style={styles.button}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

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
  paymentOptions: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  radioLabel: {
    fontSize: "16px",
    color: "#333",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  qrContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  qrImage: {
    width: "150px",
    height: "150px",
    display: "block",
    margin: "0 auto",
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

export default Paymentss;
