import React, { useState } from 'react';
import axios from 'axios';

export const Register = ({ onToggle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { name, email, password });
      alert('User registered successfully!');
    } catch (error) {
      alert('Error registering user.');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.text}>
          Already have an account? <button onClick={onToggle} style={styles.link}>Login</button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    width: '95%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  text: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#007bff',
    background: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};


