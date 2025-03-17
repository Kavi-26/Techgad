import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

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

  const generateReceipt = () => {
    const doc = new jsPDF();

    const transactionId = `TXN${Math.floor(Math.random() * 1000000000)}`;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const websiteName = "TechGadgets Store";
    const companyAddress = "123 Tech Street, New Delhi, India";
    const contactInfo = "Phone: +91-9876543210 | Email: support@techgadgets.com";

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(websiteName, 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(companyAddress, 20, 30);
    doc.text(contactInfo, 20, 38);
    doc.line(20, 42, 190, 42); // Line separator

    // Transaction Info
    doc.setFontSize(14);
    doc.text("Payment Receipt", 20, 50);
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${transactionId}`, 20, 60);
    doc.text(`Date: ${date}`, 140, 60);
    doc.text(`Time: ${time}`, 140, 68);

    doc.line(20, 72, 190, 72); // Line separator

    // Customer Details
    doc.setFont("helvetica", "bold");
    doc.text("Customer Details:", 20, 80);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${userDetails.name}`, 20, 90);
    doc.text(`Mobile: ${userDetails.mobile}`, 20, 100);
    doc.text(`Shipping Address: ${userDetails.address}`, 20, 110);

    doc.line(20, 115, 190, 115); // Line separator

    // Product Details
    doc.setFont("helvetica", "bold");
    doc.text("Product Details:", 20, 125);
    doc.setFont("helvetica", "normal");
    doc.text(`Product Name: ${product.productName}`, 20, 135);
    doc.text(`Product ID: ${product._id || "PROD123456"}`, 20, 145);
    doc.text(`Price: ₹${product.price}`, 20, 155);

    doc.line(20, 160, 190, 160); // Line separator

    // Payment Details
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details:", 20, 170);
    doc.setFont("helvetica", "normal");
    doc.text(`Payment Method: ${paymentMethod.toUpperCase()}`, 20, 180);
    doc.text(`Amount Paid: ₹${product.price}`, 20, 190);
    doc.text(`Transaction Status: Successful`, 20, 200);

    doc.line(20, 205, 190, 205); // Line separator

    // Footer
    doc.setFont("helvetica", "bold");
    doc.text("Thank you for shopping with us!", 20, 215);
    doc.setFontSize(10);
    doc.text("For support, contact us at support@techgadgets.com", 20, 225);

    // Save PDF
    doc.save(`Receipt_${userDetails.name}.pdf`);
  };

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
        generateReceipt(); // Generate receipt after successful payment
        navigate("/home");
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

      {/* Background Video */}
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src="/assets/qr.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.card}>
      <h2 style={styles.title}>Payment Page</h2>
        <img src={product.image} alt={product.productName} style={styles.image} />
        <h3 style={styles.productName}>{product.productName}</h3>
        <p style={styles.price}>Price: ₹{product.price}</p>

        <div style={styles.formGroup}>
        <h3 style={styles.subTitle}>Personal Details</h3>
        <input 
    type="text" 
    name="name"
    placeholder="Full Name" 
    value={userDetails.name} 
    onChange={handleInputChange} 
    required 
    style={styles.input} 
  />
  
  <input 
    type="text" 
    name="mobile"
    placeholder="Mobile Number" 
    value={userDetails.mobile} 
    onChange={handleInputChange} 
    required 
    maxLength="10" 
    style={styles.input} 
  />
  
  <textarea 
    name="address"
    placeholder="Shipping Address" 
    value={userDetails.address} 
    onChange={handleInputChange} 
    required 
    rows="3" 
    style={styles.textarea} 
  />
        </div>
        <h3 style={styles.subTitle}>Payment Method</h3>
        <div style={styles.paymentOptions}>
          
          <label>
               <input type="radio" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> Card 
          </label>
          <label style={styles.radioLabel}>
              <input type="radio" name="paymentMethod" value="google_upi" checked={paymentMethod === "google_upi"} onChange={(e) => setPaymentMethod(e.target.value)} /> Google Pay (UPI)
          </label>
          <label>
              <input type="radio" value="GPay" checked={paymentMethod === "GPay"} onChange={() => setPaymentMethod("GPay")} /> G-Pay QR Code
          </label>
        </div>

{paymentMethod === "card" && (
  <div style={styles.cardForm}>
    <input 
      type="text" 
      placeholder="Card Number" 
      name="cardNumber"
      value={cardDetails.cardNumber} 
      onChange={handleCardChange} 
      maxLength="16" 
      required 
      style={styles.input} 
    />
    <input 
      type="text" 
      placeholder="Expiry Date (MM/YY)" 
      name="expiry"
      value={cardDetails.expiry} 
      onChange={handleCardChange} 
      maxLength="5" 
      required 
      style={styles.input} 
    />
    <input 
      type="password" 
      placeholder="CVV" 
      name="cvv"
      value={cardDetails.cvv} 
      onChange={handleCardChange} 
      maxLength="3" 
      required 
      style={styles.input} 
    />
  </div>
)}

{paymentMethod === "google_upi" && (
            <input type="text" placeholder="Google Pay UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} required style={styles.input} />
          )}

{paymentMethod === "GPay" && (
  <div style={styles.qrContainer}>
    <p style={styles.qrText}>Scan QR Code to Pay via Google Pay:</p>
    <img 
      src={`https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=upi://pay?pa=26kaviyarasu2002@oksbi&pn=TechGadgets&mc=0000&tid=TXN${Math.floor(Math.random() * 1000000)}&tr=ORDER${Math.floor(Math.random() * 100000)}&tn=Purchase%20from%20TechGadgets&cu=INR&am=${product.price}`} 
      alt="Google Pay QR Code" 
      style={styles.qrImage} 
    />
    <p style={styles.qrNote}>Use Google Pay, PhonePe, or any UPI app to scan & pay.</p>
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
  //  background: "linear-gradient(to right,rgb(230, 233, 236), #00BFFF)",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#555",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    display: "inline-block",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    textAlign: "left",
    width: "420px",
      backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent form
      backdropFilter: "blur(15px)", // Glassmorphism effect
      border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  image: {
    width: "100%",
    maxheight: "250px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  productName: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",                                                                          
  }, 
  price: {
    textAlign: "center",
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
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  cardForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
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
  
  payButton: {
    padding: "12px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "0.3s",
    width: "100%",
    marginTop: "10px",
  },
  payButtonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "#ff4d4d",
    fontSize: "24px",
    marginTop: "50px",
  },
  videoBackground: {
    position: "fixed", // Keep video fixed in the background
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: "-1",
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(6px)", // Blur effect for readability
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Slight overlay for contrast
  },
};

export default Payment;
