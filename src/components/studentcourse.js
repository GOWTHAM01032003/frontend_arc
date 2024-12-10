import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentCourse = () => {
  const navigate = useNavigate();

  const handleSetCourses = () => {
    navigate('/admin/studentcourse/setcoursestudent'); // Navigate to SetCourseToStudent.js
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Course Management</h1>
      <button onClick={handleSetCourses} style={styles.gradientButton}>
        Set Courses to Student
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
    fontFamily:'poppins',
  },
  title: {
    fontSize: '24px',
    marginBottom: '30px',
    marginTop:'-80px',
  },
  gradientButton: {
    padding: '20px 45px',
    fontSize: '18px',
    color: 'white',
    background: 'black', // Gradient color
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default StudentCourse;
