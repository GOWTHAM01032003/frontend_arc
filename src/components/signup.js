import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi! I'm ToyBot! Need help with your signup?", fromBot: true },
    { text: "Do you already have an account?", fromBot: true },
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setChatMessages([...chatMessages, { text: "Checking your details...", fromBot: true }]);

    axios
      .post("http://localhost:8080/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        setChatMessages([
          ...chatMessages,
          { text: "Hooray! Your account has been created!", fromBot: true },
        ]);
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setError("An error occurred during registration. Please try again.");
        setChatMessages([
          ...chatMessages,
          { text: "Oops! Something went wrong! Please try again.", fromBot: true },
        ]);
      });

    setError("");
    console.log("Form submitted:", formData);
  };

  const handleChatSubmit = (message) => {
    setChatMessages([
      ...chatMessages,
      { text: message, fromBot: false },
      { text: "I'm here to assist you! 😊", fromBot: true },
    ]);
  };

  return (
    <div style={styles.backgroundContainer}>
      <div style={styles.signupContainer}>
        {/* Heading with a book emoji and title */}
        <h2 style={styles.heading}>
          📚 Academic Research Collaboration
        </h2>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your username"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="Confirm your password"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                checked={showPassword}
              />
              Show Password
            </label>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            REGISTER
          </button>
        </form>

        <p style={styles.registerPrompt}>
          Already registered?{" "}
          <span style={styles.link} onClick={() => navigate("/signin")}>
            Click here to sign in.
          </span>
        </p>

        {/* Chatbot Section */}
        <div style={styles.chatBotContainer}>
          <div style={styles.chatBotHeader}>ToyBot 💬</div>
          <div style={styles.chatBotMessages}>
            {chatMessages.map((msg, index) => (
              <div key={index} style={msg.fromBot ? styles.botMessage : styles.userMessage}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={styles.chatBotInputContainer}>
            <input
              type="text"
              placeholder="Ask me something..."
              style={styles.chatBotInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChatSubmit(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <button
              style={styles.chatBotButton}
              onClick={() => handleChatSubmit("Hello!")}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles for the page
const styles = {
  backgroundContainer: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to right, #f2f2f2, #d1d1d1)", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "poppins, sans-serif",
  },
  signupContainer: {
    maxWidth: "500px",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    background: "white",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "10px",
  },
  label: {
    marginBottom: "5px",
    display: "block",
    textAlign: "start",
    fontWeight: "medium",
  },
  input: {
    width: "100%",
    padding: "15px",
    fontSize: "15px",
    borderRadius: "30px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: "15px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  registerPrompt: {
    textAlign: "center",
    marginTop: "15px",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },

  // Chatbot Styles
  chatBotContainer: {
    marginTop: "30px",
    backgroundColor: "#f1f1f1",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  chatBotHeader: {
    textAlign: "center",
    color: "#333",
    fontSize: "20px",
    fontWeight: "bold",
  },
  chatBotMessages: {
    marginTop: "10px",
    maxHeight: "200px",
    overflowY: "auto",
    paddingBottom: "10px",
  },
  botMessage: {
    backgroundColor: "#E6F7FF",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    textAlign: "left",
  },
  userMessage: {
    backgroundColor: "#DFF0D8",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    textAlign: "right",
  },
  chatBotInputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chatBotInput: {
    width: "75%",
    padding: "10px",
    fontSize: "15px",
    borderRadius: "30px",
    border: "1px solid #ccc",
    outline: "none",
    marginRight: "10px",
  },
  chatBotButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
  },
};

export default Signup;
