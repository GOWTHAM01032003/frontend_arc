import React, { useState } from 'react';
import axios from 'axios';  // Make sure you have axios imported

const AddExams = () => {
  const [examid, setExamid] = useState(''); // New state for exam ID
  const [examName, setExamName] = useState('');
  const [examCourseCode, setExamCourseCode] = useState('');
  const [examTime, setExamTime] = useState('');
  const [examDate, setExamDate] = useState('');
  const [isActive, setIsActive] = useState('Yes'); // State to manage dropdown value

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    axios.post("http://localhost:8080/addexam", {
      examid: examid,  // Include exam ID in the request
      examname: examName,
      examtime: examTime,
      examdate: examDate,
      examcoursecode: examCourseCode,
      isactive: isActive
    })
    .then(response => {
      alert('Publication added successfully');
    })
    .catch(error => {
      console.error('There was an error adding the exam!', error);
    });

    // Reset form fields
    setExamid('');  // Reset exam ID
    setExamName('');
    setExamCourseCode('');
    setExamTime('');
    setExamDate('');
    setIsActive('Yes'); // Reset dropdown value
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Publication</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Publication ID:</label>
          <input
            type="text"
            value={examid}
            onChange={(e) => setExamid(e.target.value)}  // Handle exam ID input
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Publication Name:</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Publication Code:</label>
          <input
            type="text"
            value={examCourseCode}
            onChange={(e) => setExamCourseCode(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Publication Time:</label>
          <input
            type="time"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Publication Date:</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Is Active:</label>
          <select 
            value={isActive} 
            onChange={(e) => setIsActive(e.target.value)} 
            required 
            style={styles.input}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Add Publication</button>
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
    marginTop:'50px'
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '16px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '40px',
  },
  button: {
    padding: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    background: 'black', // CSS gradient
    transition: 'background 0.3s ease',
  },
};

export default AddExams;
