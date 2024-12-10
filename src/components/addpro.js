import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
const AddPro = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    axios.post("http://localhost:8080/signup",{
        username:username,
        email:email,
        password:password
     }).then((res)=>{
        alert("Researcher added successfully")
     navigate("/admin/professor/add")
     })
    e.preventDefault();
    alert(`Researcher Added: \nUsername: ${username}\nEmail: ${email}`);
    // Here you can add logic to send data to the backend or handle further
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Researcher</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Researcher Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Researcher Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Researcher Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Add Researcher</button>
      </form>
    </div>
  );
};

// Inline CSS
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
    marginTop:'-120px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px', // Set a width for the form
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
   
  },
  label: {
    marginBottom: '5px',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '55px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    background: 'black', // Gradient background
    transition: 'background 0.3s ease',
  },
};

export default AddPro;