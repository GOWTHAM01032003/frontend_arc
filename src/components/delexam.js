import axios from 'axios';
import { useState, useEffect } from 'react';

export default function DeleteExam() {
  // State to store the list of exams
  const [exams, setExams] = useState([]);

  // Function to handle deleting an exam by ID
  const deleteExam = (examid) => {
    axios.delete(`http://localhost:8080/deleteexam`, {
      params: { examid: examid }
    })
    .then((res) => {
      alert(res.data);  // Show confirmation message
      // Re-fetch the exams list after deleting
      setExams((prevExams) => prevExams.filter(exam => exam.examid !== examid));
    })
    .catch((err) => {
      console.error(err);
      alert('Failed to delete exam');
    });
  }

  // Fetch all exams when the component mounts
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get('http://localhost:8080/allexams');
        setExams(res.data); // Set the fetched exams
      } catch (err) {
        console.error(err);
      }
    };

    fetchExams();
  }, []); // Run only once when the component mounts

  // Show a loading message while the exams are being fetched
  if (exams.length === 0) {
    return <div style={styles.loadingContainer}>Fetching exams...</div>;
  }

  // Display the exams in a table and provide a delete button for each exam
  return (
    <div style={styles.container}>
      <table style={styles.table} border="0">
        <thead>
          <tr>
            <th style={styles.th}>Publication ID</th>
            <th style={styles.th}>Publication Code</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Is Active</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={exam.examid} style={styles.tr}>
              <td style={styles.td}>{exam.examid}</td>
              <td style={styles.td}>{exam.examcoursecode}</td>
              <td style={styles.td}>{exam.examtime}</td>
              <td style={styles.td}>{exam.examdate}</td>
              <td style={styles.td}>{exam.isactive ? 'Yes' : 'No'}</td>
              <td style={styles.td}>
                <button style={styles.button} onClick={() => deleteExam(exam.examid)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Inline CSS
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full viewport height
    backgroundColor: '#f9f9f9', // Optional light background color
    padding: '20px', // Padding around the container
    marginTop:'-100px'
  },
  loadingContainer: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '20px',
  },
  table: {
    borderCollapse: 'collapse', // Better table aesthetics
    width: '100%', // Full width to fit the screen
    maxWidth: '800px', // Optional max width for better layout
    margin: '0 auto', // Centering the table
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for a professional look
  },
  th: {
    backgroundColor: '#000000', // Header background color
    color: 'white', // Header text color
    padding: '12px 15px', // Padding for headers
    textAlign: 'left', // Align text to the left
    borderBottom: '2px solid #ddd', // Bottom border for headers
  },
  td: {
    padding: '12px 15px', // Padding for table cells
    borderBottom: '1px solid #ddd', // Bottom border for cells
  },
  tr: {
    transition: 'background 0.3s ease', // Transition for hover effect
    '&:hover': {
      backgroundColor: '#f1f1f1', // Hover effect color
    },
  },
  button: {
    padding: '8px 12px',
    background: 'black', // Gradient color
    color: 'white',
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

