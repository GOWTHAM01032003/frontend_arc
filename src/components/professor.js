import React from 'react';

const Professor = () => {
  const handleNavigation = (path) => {
    window.location.href = path; // Redirects to the specified path
  };

  return (
    <div style={styles.containerb}>
      <div style={styles.container}>
        <h1 style={styles.title}>Researcher Management</h1>
        <div style={styles.buttonContainer}>
          <button onClick={() => handleNavigation('/admin/professor/add')} style={styles.button}>
            Add Researcher
          </button>
          <button onClick={() => handleNavigation('/admin/professor/delete')} style={styles.button}>
            Delete Researcher
          </button>
          <button onClick={() => handleNavigation('/admin/professor/view')} style={styles.button}>
            View Researcher
          </button>
          <button onClick={() => handleNavigation('/admin/professor/edit')} style={styles.button}>
            Edit Researcher
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
    background: '#181818', // Dark background, like GitHub's dark mode
    color: '#e1e4e8', // Light gray text for readability
    marginTop: '-100px',
    fontFamily: 'Poppins, sans-serif',
    border: '1px solid #444444', // Dark border for structure
    borderRadius: '16px', // Rounded corners
    width: '60vw',
    padding: '40px', // Padding to provide space inside the container
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)', // Darker shadow for depth
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
    color: '#ffffff', // White title for contrast on dark background
    fontWeight: '700',
    textAlign: 'center',
  },

  buttonContainer: {
    display: 'grid', // Grid layout for a 2x2 button layout
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px', // Space between buttons
    width: '80%',
    maxWidth: '600px', // Maximum width for the buttons
  },

  button: {
    padding: '20px 40px', // Padding for larger clickable area
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
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

export default Professor;
