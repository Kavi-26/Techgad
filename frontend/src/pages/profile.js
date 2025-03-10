import React from "react";

const Profile = () => {
  const user = {
    name: "KAVI",
    email: "kavi@gmail.com",
    mobile: "+91 9876543210",
    address: "123, Tech Street, Chennai, India",
    profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF33FZymMUNM3nuovGCYrV_80Duuyx4jLYxw&s", // Placeholder Image
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Profile</h2>
      <div style={styles.card}>
        <img
          src={user.profileImage}
          alt="Profile"
          style={styles.profileImage}
        />
        <div style={styles.details}>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>
      </div>
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
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
    border: "2px solid #007BFF",
  },
  details: {
    textAlign: "left",
    lineHeight: "1.8",
    fontSize: "18px",
    color: "#555",
  },
};

export default Profile;
