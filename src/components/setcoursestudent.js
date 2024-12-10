import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SetCourseToStudent = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch students from the database
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/allstu');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch courses from the database
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/allcourses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch students and courses on component mount
  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  // Handle course selection in the dropdown
  const handleCheckboxChange = (courseCode) => {
    setSelectedCourses([courseCode]); // Set the selected courses to only the clicked course
  };

  // Handle form submission
  const handleSubmit = () => {
    const data = {
      studentId: selectedStudent,
      courses: selectedCourses,
    };

    axios.post('http://localhost:8080/addstudentcourse', data)
      .then(response => {
        alert('Courses set successfully!');
        setSelectedStudent('');
        setSelectedCourses([]);
      })
      .catch(error => {
        console.error('Error setting courses:', error);
        alert('Failed to set courses.');
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Set Courses to Student</h1>

      <div style={styles.formGroup}>
        <label style={styles.label}>Select Student:</label>
        <select
          style={styles.select}
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">-- Select Student --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.username}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Select Courses:</label>
        <div style={styles.dropdownContainer}>
          <div style={styles.dropdownHeader} onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedCourses.length === 0 ? 'Select Courses' : selectedCourses.join(', ')}
          </div>
          {dropdownOpen && (
            <div style={styles.dropdownList}>
              {courses.map((course) => (
                <div key={course.code} style={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id={course.code}
                    checked={selectedCourses.includes(course.code)}
                    onChange={() => handleCheckboxChange(course.code)} // Set only the clicked course
                  />
                  <label htmlFor={course.code} style={styles.checkboxLabel}>
                    {course.coursecode}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button onClick={handleSubmit} style={styles.submitButton}>
        Set
      </button>
    </div>
  );
};

// Inline CSS
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    fontFamily:'poppins',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    marginTop:'-120px'
  },
  formGroup: {
    marginBottom: '15px',
    width: '300px',
    textAlign: 'left',
    
  },
  label: {
    fontSize: '18px',
    marginBottom: '5px',
    display: 'block',
    color:'gray'
    
  },
  select: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    borderRadius: '45px',
    border: '1px solid #ccc',
    color:'gray'
  },
  dropdownContainer: {
    position: 'relative',
    borderRadius:'30px',
  },
  dropdownHeader: {
    padding: '15px',
    fontSize: '16px',
    borderRadius: '54px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
    color:'gray'
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    zIndex: '1',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 10px',
  },
  checkboxLabel: {
    marginLeft: '10px',
    fontSize: '16px',
  },
  submitButton: {
    padding: '15px 60px',
    fontSize: '18px',
    color: 'white',
    background: 'black', // Gradient color
    border: 'black',
    borderRadius: '35px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default SetCourseToStudent;
