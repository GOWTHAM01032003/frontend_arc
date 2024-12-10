import React, { useState } from 'react';

const Home = () => {
  document.title = '📚 Academic Research Collaboration';

  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([
    { user: 'bot', text: 'Hello! How can I help you with Academic Research Collaboration today?' },
  ]);

  const toggleChat = () => setChatVisible(!chatVisible);

  const handleUserMessage = (question) => {
    const response = getBotResponse(question);
    setMessages([...messages, { user: 'user', text: question }, { user: 'bot', text: response }]);
  };

  const getBotResponse = (question) => {
    switch (question.toLowerCase()) {
      case 'what is academic research collaboration?':
        return 'It is a platform that allows researchers to collaborate, share documents, and manage projects effectively.';
      case 'how can i sign up?':
        return 'Click on the "Sign Up" button on the homepage to register yourself.';
      case 'what are the platform features?':
        return 'The platform includes project management, document sharing, communication tools, and collaborative research modules.';
      default:
        return 'I am not sure about that. Please try asking another question!';
    }
  };

  return (
    <div style={styles.homeContainer}>
      <div style={styles.overlay}>
        <div style={styles.textContainer}>
          <h1 style={styles.heading}>📚 Academic Research Collaboration</h1>
          <p style={styles.subHeading}>
            Empowering collaboration and innovation in academic research.
          </p>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={() => (window.location.href = '/signin')}>
              Sign In
            </button>
            <button style={styles.button} onClick={() => (window.location.href = '/signup')}>
              Sign Up
            </button>
          </div>
        </div>
        <div style={styles.modulesContainer}>
          {['Document Sharing', 'Team Collaboration', 'Project Management', 'Communication Tools'].map(
            (module, index) => (
              <div key={index} style={styles.moduleCard}>
                {module}
              </div>
            )
          )}
        </div>
      </div>

      {/* Chatbot */}
      <div style={styles.chatbotContainer}>
        <div style={styles.chatbotIcon} onClick={toggleChat}>
          🧸
        </div>
        {chatVisible && (
          <div style={styles.chatWindow}>
            <div style={styles.chatHeader}>Ask Me Anything!</div>
            <div style={styles.chatMessages}>
              {messages.map((msg, idx) => (
                <div key={idx} style={msg.user === 'bot' ? styles.botMessage : styles.userMessage}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div style={styles.chatInput}>
              {['What is Academic Research Collaboration?', 'How can I sign up?', 'What are the platform features?'].map(
                (question, index) => (
                  <button
                    key={index}
                    style={styles.chatButton}
                    onClick={() => handleUserMessage(question)}
                  >
                    {question}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  homeContainer: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("https://images.unsplash.com/photo-1556761175-5973dc0f32e7")', // Classic background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: 'white',
    textAlign: 'center',
  },
  textContainer: {
    padding: '20px',
  },
  heading: {
    fontSize: '3.5em',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
  },
  subHeading: {
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '12px 30px',
    fontSize: '1em',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  modulesContainer: {
    display: 'flex',
    gap: '20px',
  },
  moduleCard: {
    padding: '15px 20px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    fontSize: '1em',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
  chatbotContainer: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chatbotIcon: {
    fontSize: '3em',
    cursor: 'pointer',
  },
  chatWindow: {
    width: '300px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  },
  chatMessages: {
    height: '200px',
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#f8f9fa',
  },
  botMessage: {
    textAlign: 'left',
    color: '#007bff',
    margin: '5px 0',
  },
  userMessage: {
    textAlign: 'right',
    color: '#28a745',
    margin: '5px 0',
  },
  chatInput: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  chatButton: {
    padding: '8px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;
