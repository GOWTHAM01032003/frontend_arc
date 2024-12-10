import React, { useState } from 'react';
import axios from 'axios';
const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    
    axios.post("http://localhost:8080/addcourse",{
      coursename:courseName,
      coursecode:courseCode
    }).then(()=>{
      alert(`Course Added: \nName: ${courseName}, Code: ${courseCode}`);
    })
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Course</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label} htmlFor="courseName">Course Name</label>
        <input
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={styles.input}
          placeholder="Enter course name"
          required
        />

        <label style={styles.label} htmlFor="courseCode">Course Code</label>
        <input
          type="text"
          id="courseCode"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          style={styles.input}
          placeholder="Enter course code"
          required
        />

        <button type="submit" style={styles.submitButton}>Add Course</button>
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
    fontFamily:'poppins',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: 'black',
    marginTop:'-100px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '25px',
  },
  label: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
  input: {
    padding: '15px',
    fontSize: '16px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '30px',
  },
  submitButton: {
    padding: '17px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    background: 'black', // Gradient background
    transition: 'background 0.3s ease',
  },
};

export default AddCourse;
