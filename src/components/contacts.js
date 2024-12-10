import React from 'react';
import axios from 'axios';

// CSS in JS
const styles = {
  container: {
    backgroundColor: '#ffffff', // Cream background color for the container
    color: 'black', // Change text color to black for better contrast
    padding: '10px ',
    fontFamily: 'poppins, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.3rem',
    fontWeight:300,
    marginBottom: '40px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  box: {
    border: '3px solid #000000',
    borderRadius: '30px',
    padding: '20px',
    borderStyle:'dotted',
    flex: '1',
    margin: '10px',
    backgroundColor: '#ffffff', // White background for boxes for a light theme
    color: 'black', // Change text color to black for better contrast
  },
  icon: {
    marginRight: '10px',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  socialIcon: {
    margin: '0 10px',
    fontSize: '1.5rem',
    color: 'black', // Change social icon color to black
  },
};

// Functional Component for Contact Us Page
const ContactUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>
      <h2 style={styles.subtitle}>The Collaboration Team</h2>
      <div style={styles.row}>
        <div style={styles.box}>
          <h3>Reservations Office</h3>
          <p><span style={styles.icon}>📍</span><a href="#" style={{ color: 'black', textDecoration: 'none' }}>KL University, Vadeeswaram</a></p>
          <p><span style={styles.icon}>📞</span>08645 - 350200</p>
          <p><span style={styles.icon}>📧</span>klu@kluniversity.in</p>
        </div>
        <div style={styles.box}>
          <h3>Office Hours</h3>
          <p>Monday to Friday<br />9:00 am to 6:00 pm</p>
          <p>Saturday<br />9:00 am to 12:00 noon</p>
        </div>
        <div style={styles.box}>
          <h3>Get Social</h3>
          <div style={styles.socialIcons}>
            <a href="https://facebook.com" style={styles.socialIcon}>📘</a>
            <a href="https://twitter.com" style={styles.socialIcon}>🐦</a>
            <a href="https://instagram.com" style={styles.socialIcon}>📸</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
