import React from 'react';

const Exams = () => {
  const handleNavigation = (path) => {
    window.location.href = path; // Redirects to the specified path
  };

  return (
    <div style={styles.containerb}>
      <div style={styles.container}>
        <h1 style={styles.title}>Publication Management</h1>
        <div style={styles.buttonContainer}>
          <button onClick={() => handleNavigation('/admin/exams/add')} style={styles.button}>
            Add Publication
          </button>
          <button onClick={() => handleNavigation('/admin/exams/delete')} style={styles.button}>
            Delete Publication
          </button>
          <button onClick={() => handleNavigation('/admin/exams/view')} style={styles.button}>
            View Publication
          </button>
          <button onClick={() => handleNavigation('/admin/exams/edit')} style={styles.button}>
            Edit Publication
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
    width: '60vw',
    borderRadius: '16px',
    background: '#181818', // Dark background to match GitHub dark mode
    color: '#e1e4e8', // Light text for contrast
    border: '1px solid #444444', // Subtle dark border
    marginTop: '-100px',
    fontFamily: 'Poppins, sans-serif',
    padding: '40px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)', // Soft shadow for depth
  },

  containerb: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '130px',
  },

  title: {
    fontSize: '32px',
    marginBottom: '50px',
    color: '#ffffff', // White text for the title
    fontWeight: '700',
    textAlign: 'center',
  },

  buttonContainer: {
    display: 'grid', // Using grid for a 2x2 layout
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
    gap: '20px', // Space between buttons
    width: '80%',
    maxWidth: '600px',
  },

  button: {
    padding: '20px 40px', // More padding for larger clickable area
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px', // Rounded buttons
    cursor: 'pointer',
    background: '#0366d6', // GitHub blue for buttons
    transition: 'background 0.3s ease, transform 0.2s ease', // Smooth hover effects
    letterSpacing: '0.5px',
  },

  buttonHover: {
    background: '#0288d1', // Darker blue on hover
    transform: 'scale(1.05)', // Slight zoom effect on hover
  },
};

export default Exams;
