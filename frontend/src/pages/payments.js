import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const Paymentss = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || {};

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  // Generate a random Transaction ID
  const generateTransactionId = () => {
    return "TXN" + Math.floor(1000000000 + Math.random() * 9000000000);
  };

  // Generate Receipt PDF
  const generateReceipt = () => {
    const transactionId = generateTransactionId();
    const websiteName = "TechGadgets Store";
    const contactInfo = "Customer Support: +91-9876543210 | Email: support@techgadgets.com";

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(`${websiteName}`, 70, 15);
    doc.setFontSize(16);
    doc.text("Payment Receipt", 80, 30);

    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 40);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 150, 50);
    doc.text(`Transaction ID: ${transactionId}`, 20, 60);
    doc.text(`Product ID: ${product.id || "N/A"}`, 20, 70);

    
    doc.setFont("helvetica", "normal");
    doc.text(`Customer Name: ${name}`, 20, 85);
    doc.text(`Mobile: ${mobile}`, 20, 95);
    doc.text(`Shipping Address: ${address}`, 20, 105);
    doc.text(`Payment Method: ${paymentMethod.toUpperCase()}`, 20, 115);
    if (paymentMethod === "google_upi") doc.text(`UPI ID: ${upiId}`, 20, 125);

    doc.setFont("helvetica", "bold");
    doc.text("Product Details:", 20, 140);
    doc.setFont("helvetica", "normal");
    doc.text(`Product: ${product.productName}`, 20, 150);
    doc.text(`Price: ₹${product.price}`, 20, 160);

    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount Paid: ₹${product.price}`, 20, 180);

    doc.setFontSize(10);
    doc.text(contactInfo, 20, 200);

    doc.save("Payment_Receipt.pdf");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !mobile || !address) {
      alert("Please fill all personal details");
      return;
    }

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

    generateReceipt();
    alert(`Payment Successful using ${paymentMethod.toUpperCase()}`);
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
      <h2 style={styles.title}>Payment Page</h2>

        <div style={styles.productInfo}>
          <img src={product.image} alt={product.productName} style={styles.productImage} />
          <h3 style={styles.productName}>{product.productName}</h3>
          <p style={styles.price}>Price: ₹{product.originalPrice - (product.originalPrice * product.discountPercentage) / 100}</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.subTitle}>Personal Details</h3>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required style={styles.input} />
          <textarea placeholder="Shipping Address" value={address} onChange={(e) => setAddress(e.target.value)} required style={styles.textarea} />

          <h3 style={styles.subTitle}>Payment Method</h3>
          <div style={styles.paymentOptions}>
            <label style={styles.radioLabel}>
              <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} /> Card
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" name="paymentMethod" value="google_upi" checked={paymentMethod === "google_upi"} onChange={(e) => setPaymentMethod(e.target.value)} /> Google Pay (UPI)
            </label>
            <label>
              <input type="radio" value="GPay" checked={paymentMethod === "GPay"} onChange={() => setPaymentMethod("GPay")} /> G-Pay QR Code
            </label>
          </div>

          {paymentMethod === "card" && (
            <div>
              <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required style={styles.input} />
              <input type="text" placeholder="Expiry Date (MM/YY)" value={expiry} onChange={(e) => setExpiry(e.target.value)} required style={styles.input} />
              <input type="password" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required style={styles.input} />
            </div>
          )}

          {paymentMethod === "google_upi" && (
            <input type="text" placeholder="Google Pay UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} required style={styles.input} />
          )}

{paymentMethod === "GPay" && (
  <div style={styles.qrContainer}>
    <p style={styles.qrText}>Scan QR Code to Pay via Google Pay:</p>
    <img 
      src={`https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=upi://pay?pa=9876543210@okhdfcbank&pn=TechGadgets&mc=0000&tid=TXN${Math.floor(Math.random() * 1000000)}&tr=ORDER${Math.floor(Math.random() * 100000)}&tn=Purchase%20from%20TechGadgets&cu=INR&am=${product.price}`} 
      alt="Google Pay QR Code" 
      style={styles.qrImage} 
    />
    <p style={styles.qrNote}>Use Google Pay, PhonePe, or any UPI app to scan & pay.</p>
  </div>
)}

          <button type="submit" style={styles.button}>Confirm & Pay</button>
        </form>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right,rgb(230, 233, 236), #00BFFF)",
    padding: "20px",
  },
  card: {
    width: "400px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  productInfo: {
    textAlign: "center",
    marginBottom: "20px",
  },
  productImage: {
    width: "100%",
    maxheight: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  productName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007BFF",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#555",
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
    height: "80px",
    resize: "none",
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
  qrContainer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    marginTop: "20px",
  },
  qrText: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  qrImage: {
    width: "225px",
    height: "225px",
    borderRadius: "10px",
  },
  qrNote: {
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
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
