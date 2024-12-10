import axios from "axios";
import { useState, useEffect } from "react";

export default function EditExam() {
  const [exams, setExams] = useState(null); // To store the fetched exams data
  const [editData, setEditData] = useState({
    examid: "",
    examcoursecode: "",
    examtime: "",
    examdate: "",
    isactive: "",
  }); // State to store the current exam being edited
  const [isEditing, setIsEditing] = useState(false); // To toggle editing mode

  // Fetch exams when the component mounts
  useEffect(() => {
    if (exams === null) {
      axios.get("http://localhost:8080/allexams")
        .then((res) => {
          setExams(res.data); // Set the fetched exams data
        });
    }
  }, [exams]);

  // Trigger editing mode and set the form fields with selected exam's data
  const editExam = (examid, examcoursecode, examtime, examdate, isactive) => {
    setEditData({ examid, examcoursecode, examtime, examdate, isactive });
    setIsEditing(true);
  };

  // Handle saving the edited exam details
  const saveEdit = () => {
    axios.put("http://localhost:8080/updateexam", {
      examid: editData.examid,
      examcoursecode: editData.examcoursecode,
      examtime: editData.examtime,
      examdate: editData.examdate,
      isactive: editData.isactive,
    }).then((res) => {
      alert(res.data);
      setExams(null); // Refresh the exam list after editing
      setIsEditing(false); // Exit editing mode
    });
  };

  // Display a loading message while fetching data
  if (exams === null) {
    return <div style={styles.loadingContainer}>Fetching exams...</div>;
  }

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
            <tr key={index} style={styles.tr}>
              <td style={styles.td}>{exam.examid}</td>
              <td style={styles.td}>{exam.examcoursecode}</td>
              <td style={styles.td}>{exam.examtime}</td>
              <td style={styles.td}>{exam.examdate}</td>
              <td style={styles.td}>{exam.isactive}</td>
              <td style={styles.td}>
                <button style={styles.button} onClick={() => editExam(exam.examid, exam.examcoursecode, exam.examtime, exam.examdate, exam.isactive)}>EDIT</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {isEditing && (
        <div id="edit" style={styles.editContainer}>
          <h3>Edit Exam</h3>
          <div>
            <label>Exam ID:</label>
            <input type="text" value={editData.examid} readOnly style={styles.input} />
            <br />
            <label>Course Code:</label>
            <input
              type="text"
              value={editData.examcoursecode}
              onChange={(e) =>
                setEditData({ ...editData, examcoursecode: e.target.value })
              }
              style={styles.input}
            />
            <br />
            <label>Time:</label>
            <input
              type="time"
              value={editData.examtime}
              onChange={(e) => setEditData({ ...editData, examtime: e.target.value })}
              style={styles.input}
            />
            <br />
            <label>Date:</label>
            <input
              type="date"
              value={editData.examdate}
              onChange={(e) => setEditData({ ...editData, examdate: e.target.value })}
              style={styles.input}
            />
            <br />
            <label>Is Active:</label>
            <select
              value={editData.isactive}
              onChange={(e) => setEditData({ ...editData, isactive: e.target.value })}
              style={styles.select}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <br />
            <button style={styles.button} onClick={saveEdit}>SAVE EDIT</button>
            <button style={styles.button} onClick={() => setIsEditing(false)}>CANCEL</button>
          </div>
        </div>
      )}
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
    borderRadius: '55px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    margin: '5px', // Space between buttons
  },
  editContainer: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd', // Border around edit form
    borderRadius: '50px', // Rounded corners for edit form
    backgroundColor: '#fff', // Background color for the edit form
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for the edit form
    width: '100%', // Full width to fit the screen
    maxWidth: '500px', // Optional max width for better layout
  },
  input: {
    padding: '8px',
    border: '1px solid #ddd', // Border for input fields
    borderRadius: '54px', // Rounded corners for input fields
    width: '100%', // Full width for input fields
    margin: '5px 0', // Space between inputs
  },
  select: {
    padding: '8px',
    border: '1px solid #ddd', // Border for select field
    borderRadius: '34px', // Rounded corners for select field
    width: '100%', // Full width for select field
    margin: '5px 0', // Space between select and inputs
  },
};

