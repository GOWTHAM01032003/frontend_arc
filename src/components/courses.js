import React from 'react';

const Courses = () => {
  const handleNavigation = (path) => {
    window.location.href = path; // Redirects to the specified path
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <h1 style={styles.title}>Courses Management</h1>
        <div style={styles.buttonContainer}>
          <button onClick={() => handleNavigation('/admin/courses/add')} style={styles.button}>
            Add Course
          </button>
          <button onClick={() => handleNavigation('/admin/courses/delete')} style={styles.button}>
            Delete Course
          </button>
          <button onClick={() => handleNavigation('/admin/courses/view')} style={styles.button}>
            View Course
          </button>
          <button onClick={() => handleNavigation('/admin/courses/edit')} style={styles.button}>
            Edit Course
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline CSS for GitHub-Inspired UI
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f8fa', // Light GitHub background color
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    color: '#24292f', // Dark text for readability
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background for the main container
    padding: '40px',
    borderRadius: '12px',
    width: '70vw',
    maxWidth: '900px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Light shadow for a clean, elevated look
    border: '1px solid #d1d5da', // Subtle border for structure
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
    color: '#24292f', // Dark text for the title
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Grid layout for buttons
    gap: '16px',
    width: '80%',
  },
  button: {
    padding: '14px 24px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: '#0366d6', // GitHub blue for buttons
    transition: 'background 0.2s ease, transform 0.2s ease',
    letterSpacing: '0.5px',
  },
  buttonHover: {
    backgroundColor: '#0288d1', // Slightly darker blue on hover
    transform: 'scale(1.05)', // Slight zoom effect on hover
  },
};

export default Courses;
