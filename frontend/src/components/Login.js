// import React, { useState } from 'react';
// //import { useAuth } from '../context/AuthContext';

// export const Login = ({ onToggle }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   //const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       //await login(email, password);
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.inputGroup}>
//             <label htmlFor="email" style={styles.label}>Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>
//           <div style={styles.inputGroup}>
//             <label htmlFor="password" style={styles.label}>Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>
//           <button type="submit" style={styles.button}>Login</button>
//         </form>
//         <p style={styles.toggleText}>
//           Don't have an account?{' '}
//           <button onClick={onToggle} style={styles.toggleButton}>Register</button>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#f4f4f4',
//   },
//   card: {
//     backgroundColor: 'white',
//     padding: '2rem',
//     borderRadius: '8px',
//     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '400px',
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: '16px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   inputGroup: {
//     marginBottom: '12px',
//     textAlign: 'left',
//   },
//   label: {
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#555',
//     marginBottom: '4px',
//     display: 'block',
//   },
//   input: {
//     width: '95%',
//     padding: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     fontSize: '14px',
//   },
//   button: {
//     width: '100%',
//     padding: '10px',
//     borderRadius: '5px',
//     backgroundColor: '#007BFF',
//     color: 'white',
//     fontSize: '16px',
//     border: 'none',
//     cursor: 'pointer',
//     transition: 'background 0.3s',
//   },
//   buttonHover: {
//     backgroundColor: '#0056b3',
//   },
//   toggleText: {
//     marginTop: '12px',
//     fontSize: '14px',
//     color: '#555',
//   },
//   toggleButton: {
//     background: 'none',
//     border: 'none',
//     color: '#007BFF',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: 'bold',
//   },
// };










import React, { useState } from 'react';
import axios from 'axios';

export const Login = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await axios.post('http://localhost:5000/login', { email, password });
      alert(response.data.message);
    } catch (error) {
      alert('Invalid email or password.');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.text}>
          Don't have an account? <button onClick={onToggle} style={styles.link}>Register</button>
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


