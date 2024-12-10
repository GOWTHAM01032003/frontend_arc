import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const handleLogout = () => {
    alert("Logged out successfully");
    navigate("/signin");
  };

  const handleChatToggle = () => {
    setChatVisible(!chatVisible);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { text: userMessage, sender: 'user' };
    setChatMessages([...chatMessages, newMessage]);

    try {
      // Call OpenAI API
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'gpt-3.5-turbo',
        prompt: userMessage,
        max_tokens: 150,
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`,  // Replace with your OpenAI API key
          'Content-Type': 'application/json'
        }
      });

      const botResponse = response.data.choices[0].text.trim();
      setChatMessages([...chatMessages, newMessage, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching data from OpenAI', error);
      setChatMessages([...chatMessages, newMessage, { text: 'Sorry, I could not process your request. Please try again.', sender: 'bot' }]);
    }

    setUserMessage('');
  };

  return (
    <div style={styles.navbarContainer}>
      <div style={styles.navbar}>
        <div style={styles.logo}>
          <h2>
            <span style={styles.icon}>📚</span> Academic Research Collaboration
          </h2>
          <p style={styles.subtitle}>Admin Dashboard</p>
        </div>
        <div style={styles.navLinks}>
          <a href="/admin/adminhome1" style={styles.navLink}>Home</a>
          <a href="/admin/professor" style={styles.navLink}>Researchers</a>
          <a href="/admin/courses" style={styles.navLink}>Courses</a>
          <a href="/admin/student" style={styles.navLink}>Users</a>
          <a href="/admin/exams" style={styles.navLink}>Publication</a>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      </div>

      {/* Chatbot */}
      {chatVisible && (
        <div style={styles.chatbotContainer}>
          <div style={styles.chatbotHeader}>
            <span>Chat with us!</span>
            <button onClick={handleChatToggle} style={styles.closeChatButton}>X</button>
          </div>
          <div style={styles.chatMessages}>
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} style={styles.chatForm}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              style={styles.chatInput}
              placeholder="Ask a question..."
            />
            <button type="submit" style={styles.chatSubmitButton}>Send</button>
          </form>
        </div>
      )}

      <button onClick={handleChatToggle} style={styles.chatButton}>Chat</button>
    </div>
  );
};

// Inline CSS
const styles = {
  navbarContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '20px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: 'black',
    fontFamily: 'Poppins',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    color: '#000000',
  },
  logo: {
    color: 'black',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: '#777',
  },
  icon: {
    marginRight: '10px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: 'black',
    textDecoration: 'none',
    margin: '0 30px',
    fontSize: '15px',
  },
  logoutButton: {
    padding: '12px 25px',
    backgroundColor: '#000000',
    color: 'white',
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  chatButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#000000',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '16px',
  },
  chatbotContainer: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    width: '300px',
    backgroundColor: '#fff',
    border: '2px solid #000',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  chatbotHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    marginBottom: '10px',
  },
  closeChatButton: {
    background: 'none',
    border: 'none',
    color: '#000',
    fontSize: '20px',
    cursor: 'pointer',
  },
  chatMessages: {
    maxHeight: '200px',
    overflowY: 'auto',
    marginBottom: '10px',
  },
  userMessage: {
    backgroundColor: '#f1f1f1',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
    alignSelf: 'flex-start',
  },
  botMessage: {
    backgroundColor: '#d1ffd6',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
    alignSelf: 'flex-end',
  },
  chatForm: {
    display: 'flex',
    alignItems: 'center',
  },
  chatInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    fontSize: '14px',
    marginRight: '10px',
  },
  chatSubmitButton: {
    backgroundColor: '#000000',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
};

export default AdminNavbar;
