import React, { useState } from 'react';

export default function AdminHome() {
  const loggedInUser = localStorage.getItem("loggedInUser"); // Retrieve the username from localStorage

  // State for chatbot conversation
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Hello! How can I assist you with managing collaborations?', sender: 'bot' },
        ]);
      }, 500);
    }
  };

  return (
    <div>
      <style>{`
        /* Global Styling */
        body {
          font-family: 'Roboto', sans-serif;
          background-color: #f6f8fa; /* GitHub Light Theme */
          margin: 0;
          padding: 0;
        }

        .home-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        /* Header Section */
        header {
          background-color: #24292f; /* GitHub Dark Header */
          color: white;
          padding: 20px;
          border-radius: 6px;
          margin-bottom: 30px;
        }

        header h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
        }

        header p {
          font-size: 1.2em;
        }

        /* Welcome Section */
        .welcome-user {
          font-size: 1.5em;
          color: #24292f;
          margin-top: 20px;
        }

        /* Features Section */
        .features-section {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
          margin-bottom: 40px;
        }

        .feature-box {
          background-color: white;
          border-radius: 6px;
          padding: 30px;
          width: 250px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          text-align: left;
          border: 1px solid #e1e4e8;
        }

        .feature-box h3 {
          color: #24292f;
          font-size: 1.3em;
          margin-bottom: 15px;
        }

        .feature-box p {
          color: #586069;
          font-size: 1em;
        }

        /* Chatbot Section */
        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 300px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          padding: 10px;
          border: 1px solid #e1e4e8;
        }

        .chatbot-header {
          background-color: #24292f;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 6px;
        }

        .chatbot-body {
          max-height: 200px;
          overflow-y: auto;
          margin: 10px 0;
          padding: 5px;
        }

        .chatbot-body .message {
          margin-bottom: 15px;
        }

        .chatbot-body .message.user {
          text-align: right;
          color: #0366d6;
        }

        .chatbot-body .message.bot {
          text-align: left;
          color: #24292f;
        }

        .chatbot-input {
          display: flex;
          margin-top: 10px;
        }

        .chatbot-input input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1em;
        }

        .chatbot-input button {
          background-color: #28a745; /* GitHub's green */
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 6px;
          cursor: pointer;
          margin-left: 10px;
        }

        .chatbot-input button:hover {
          background-color: #218838;
          transition: 0.3s;
        }

        /* Call-to-Action Button */
        .cta-button {
          background-color: #28a745; /* GitHub's green */
          color: white;
          padding: 12px 25px;
          font-size: 1.1em;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 30px;
        }

        .cta-button:hover {
          background-color: #218838;
          transition: 0.3s;
        }

        /* Footer Section */
        footer {
          background-color: #24292f;
          color: white;
          padding: 15px;
          margin-top: 50px;
          font-size: 0.9em;
        }

        footer a {
          color: #6c757d;
          text-decoration: none;
        }

        footer a:hover {
          text-decoration: underline;
        }

      `}</style>

      <div className="home-container">
        {/* Header Section */}
        <header>
          <h1>Admin Dashboard - Manage Research Collaborations</h1>
          <p>Manage research, collaborate effectively, and track publications.</p>
        </header>

        {/* Welcome Section */}
        <div className="welcome-user">
          <p>Welcome back, {loggedInUser ? loggedInUser : 'Admin'}!</p>
        </div>

        {/* Features Section */}
        <section className="features-section">
          <div className="feature-box">
            <h3>Research Group Management</h3>
            <p>Monitor and manage research groups, add members, and oversee collaboration projects.</p>
          </div>
          <div className="feature-box">
            <h3>Publication Oversight</h3>
            <p>Review, track, and approve research publications submitted by groups or researchers.</p>
          </div>
          <div className="feature-box">
            <h3>Resource Sharing</h3>
            <p>Ensure easy access to shared resources, research papers, and datasets among collaborators.</p>
          </div>
        </section>

        {/* Call to Action Button */}
        <button className="cta-button">Manage Collaborations</button>

        {/* Chatbot Section */}
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Chatbot</h3>
          </div>
          <div className="chatbot-body">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>

        {/* Footer Section */}
        <footer>
          <p>ScholarConnect © 2024 - All Rights Reserved | <a href="#">Privacy</a> | <a href="#">Terms</a></p>
        </footer>
      </div>
    </div>
  );
}
