import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Main React Component for Researcher Profile
const Researcher = () => {
  const navigate = useNavigate();

  // Initial researcher state
  const [researcher, setResearcher] = useState({
    username: '',
    email: '',
    profilePicture: '',
    projects: [],
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch researcher profile data (example API call)
    axios
      .get('http://localhost:8080/api/researcher/profile')  // Replace with your actual API endpoint
      .then((res) => {
        setResearcher(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching researcher profile:', err);
        setError('Failed to load researcher data');
        setIsLoading(false);
      });
  }, []);

  // Update profile handler
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    axios
      .put('http://localhost:8080/api/researcher/profile', researcher)
      .then((res) => {
        alert('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        setError('Failed to update profile');
      });
  };

  // Navigate to project details
  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="container">
      <div className="profile-card">
        <h2 className="heading">Researcher Profile</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="profile-picture">
              <img
                src={researcher.profilePicture || 'default-avatar.png'} // Replace with actual profile picture URL
                alt="Profile"
                className="image"
              />
            </div>
            <form onSubmit={handleUpdateProfile} className="form">
              <div className="form-group">
                <label className="label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={researcher.username}
                  onChange={(e) => setResearcher({ ...researcher, username: e.target.value })}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={researcher.email}
                  onChange={(e) => setResearcher({ ...researcher, email: e.target.value })}
                  className="input"
                />
              </div>

              <button type="submit" className="button">
                Update Profile
              </button>
            </form>

            <h3 className="subheading">My Projects</h3>
            {researcher.projects.length > 0 ? (
              <ul className="project-list">
                {researcher.projects.map((project) => (
                  <li key={project.id} className="project-item">
                    <span>{project.title}</span>
                    <button
                      onClick={() => handleViewProject(project.id)}
                      className="view-button"
                    >
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects available.</p>
            )}
          </>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Researcher;

// CSS Styles (in the same file for convenience)
const styles = `
  /* Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(135deg, #f0f4f8, #dbe4ec);
    font-family: 'Helvetica Neue', sans-serif;
    color: #333;
  }

  /* Container */
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0 20px;
    background-color: #f4f9ff;
  }

  .profile-card {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    width: 450px;
    transition: box-shadow 0.3s ease;
  }

  .profile-card:hover {
    box-shadow: 0 15px 60px rgba(0, 0, 0, 0.15);
  }

  .heading {
    text-align: center;
    font-size: 28px;
    color: #333;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .profile-picture {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .image {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    border: 5px solid #5e72e4;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  .form {
    margin-bottom: 30px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .label {
    font-size: 14px;
    font-weight: 600;
    color: #5e72e4;
  }

  .input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #dbe4ec;
    background: #f4f9ff;
    font-size: 14px;
    transition: border 0.3s ease;
  }

  .input:focus {
    border-color: #5e72e4;
    outline: none;
  }

  .button {
    width: 100%;
    padding: 14px;
    background-color: #5e72e4;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #4e61c7;
  }

  .subheading {
    margin-top: 30px;
    font-size: 22px;
    font-weight: 600;
    color: #333;
    text-align: center;
  }

  .project-list {
    list-style: none;
    padding-left: 0;
  }

  .project-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 16px;
    color: #333;
  }

  .view-button {
    background-color: #5e72e4;
    color: white;
    padding: 8px 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .view-button:hover {
    background-color: #4e61c7;
  }

  .error {
    color: #d9534f;
    font-size: 14px;
    text-align: center;
    margin-top: 15px;
  }
`;

export const injectStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

// Call injectStyles in your root component (e.g., App.js)
injectStyles();
