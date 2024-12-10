import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentUsername: '',
    studentEmail: '',
    studentPassword: '',
  });

  const [error, setError] = useState('');

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { studentUsername, studentEmail, studentPassword } = formData;

    // Basic validation
    if (!studentUsername || !studentEmail || !studentPassword) {
      setError('All fields are required');
      return;
    }

    setError('');
    
    axios.post("http://localhost:8080/signup", {
      username: studentUsername,
      email: studentEmail,
      password: studentPassword,
    }).then((res) => {
      alert("Student added Successfully");
      navigate("/admin/student/add");
    }).catch((error) => {
      alert("Error adding student: " + error.message);
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Student</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="studentUsername"
            value={formData.studentUsername}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter student username"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>User Email</label>
          <input
            type="email"
            name="studentEmail"
            value={formData.studentEmail}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter student email"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>User Password</label>
          <input
            type="password"
            name="studentPassword"
            value={formData.studentPassword}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter student password"
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>Add User</button>
      </form>
    </div>
  );
};

// Inline CSS for styling
const styles = {
  container: {
    maxWidth: '400px',
    margin: '20px auto', // Increased margin to push the card down
    padding: '20px',
    borderRadius: '8px',
    fontFamily: 'poppins, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    borderRadius: '40px',
    border: '1px solid #ccc',
    outline: 'none',
    backgroundColor: '#fff',
    transition: 'border-color 0.2s',
  },
  button: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#000000',
    color: 'white',
    border: 'none',
    borderRadius: '54px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background 0.3s ease',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default AddStu;
