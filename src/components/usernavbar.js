import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully");
    navigate("/signin");
  };

  return (
    <div style={styles.navbarContainer}>
      <div style={styles.navbar}>
        <div style={styles.logo}>User Dashboard</div>
        <div style={styles.navLinks}>
          <a href="/user/home1" style={styles.navLink}>Home</a>
          
          <a href="/user/collab" style={styles.navLink}>CollaborationTools</a>
          <a href="/user/task" style={styles.navLink}>TaskMilestoneTracking</a>
          <a href="/user/report" style={styles.navLink}>ReportingAnalytics</a>
          <a href="/user/contactus" style={styles.navLink}>Contact</a>
          
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline CSS
const styles = {
  navbarContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '20px 0', // Increased padding for height
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color:'black',
    fontFamily: 'poppins',
    
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    color:'black'
  
  },
  logo: {
    color: 'black',
    fontSize: '23px', // Increased font size for the logo
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: 'black',
    textDecoration: 'none',
    margin: '0 30px',
    fontWeight:'500',
    fontSize: '15px', // Increased font size for nav links
    fontFamily: 'poppins',
  },
  logoutButton: {
    padding: '12px 27px',
    backgroundColor: '#000000',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '15px', // Increased font size for logout button
  },
};

export default UserNavbar;
