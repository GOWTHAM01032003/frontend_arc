import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Welcome! I'm ClassicBot 🤖. How can I help you with research collaboration today?" },
  ]);

  const researchQuestions = [
    "What features does this platform offer?",
    "How do I share documents with my team?",
    "How can I manage tasks effectively?",
    "How do I track research project progress?",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addChatMessage = (sender, text) => {
    setChatMessages((prev) => [...prev, { sender, text }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      const errorMsg = "⚠️ Please fill in both username and password.";
      setError(errorMsg);
      addChatMessage("bot", errorMsg);
      return;
    }

    // Check for hardcoded admin credentials
    if (username === "admin" && password === "admin") {
      alert("✅ Welcome, Admin!");
      localStorage.setItem("loggedInUser", username);
      navigate("/admin/adminhome1"); // Redirect to admin dashboard
      return;
    }

    // If not admin, proceed with server check
    axios
      .get("http://localhost:8080/signin", {
        params: { username, password },
      })
      .then((res) => {
        if (res.data === "admin") {
          alert("✅ Welcome, Admin!");
          localStorage.setItem("loggedInUser", username);
          navigate("/admin/professor");
        } else if (res.data === "user") {
          alert("✅ Welcome, User!");
          localStorage.setItem("loggedInUser", username);
          navigate("/user/home1");
        } else {
          const loginError = "❌ Invalid credentials. Please try again.";
          setError(loginError);
          addChatMessage("bot", loginError);
        }
      })
      .catch(() => {
        const serverError = "⚠️ Server is currently unavailable. Please try again later.";
        setError(serverError);
        addChatMessage("bot", serverError);
      });
  };

  const handleChatSend = (message) => {
    if (!message) return;
    addChatMessage("user", message);

    const lowerCaseMessage = message.toLowerCase();
    const matchingResponse = researchQuestions.find((q) =>
      q.toLowerCase().includes(lowerCaseMessage)
    );

    const botResponse = matchingResponse
      ? `🔍 "${matchingResponse}" - You can explore these tools in our project dashboard. Let me know if you need a detailed guide!`
      : "🤔 I didn't understand that. Could you ask about research collaboration features or tasks?";

    setTimeout(() => {
      addChatMessage("bot", botResponse);
    }, 1000);
  };

  const handleSignUpRedirect = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.signinContainer}>
        {/* Modified heading with icon */}
        <h2 style={styles.heading}>
          <span style={styles.icon}>📚</span> Academic Research Collaboration
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Username"
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Password"
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={styles.signUpContainer}>
          <p style={styles.signUpText}>
            Don't have an account? <span onClick={handleSignUpRedirect} style={styles.signUpLink}>Sign Up</span>
          </p>
        </div>

        <button
          style={styles.toggleBotButton}
          onClick={() => setShowChatbot(!showChatbot)}
        >
          {showChatbot ? "Hide ClassicBot 🤖" : "Need Help? Talk to ClassicBot 🤖"}
        </button>

        {showChatbot && (
          <div style={styles.chatbotContainer}>
            <div style={styles.chatHeader}>ClassicBot 🤖 - Your Research Assistant</div>
            <div style={styles.chatMessages}>
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  style={
                    msg.sender === "bot"
                      ? styles.botMessage
                      : styles.userMessage
                  }
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Ask me anything..."
              style={styles.chatInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleChatSend(e.target.value);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Styles (same as before)
const styles = {
  pageContainer: {
    background: "url('https://www.transparenttextures.com/patterns/white-diamond.png'), #f4f5f7",
    backgroundSize: "cover",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  signinContainer: {
    width: "400px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "24px",
  },
  icon: {
    marginRight: "8px",
    fontSize: "30px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default Signin;
