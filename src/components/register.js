import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [registrationData, setRegistrationData] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState({});
  const [registeredCourses, setRegisteredCourses] = useState([]);

  // Fetch courses and faculty on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/allcourses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchFaculty = async () => {
      try {
        const response = await axios.get('http://localhost:8080/allpro');
        setFaculty(response.data);
      } catch (error) {
        console.error('Error fetching faculty:', error);
      }
    };

    fetchCourses();
    fetchFaculty();
  }, []);

  const handleRegister = async (coursecode) => {
    const selectedProf = selectedFaculty[coursecode];
    if (selectedProf) {
      const newEntry = {
        courseCode: coursecode,
        faculty: selectedProf,
      };
      setRegistrationData([...registrationData, newEntry]);
      setRegisteredCourses([...registeredCourses, coursecode]);
      alert(`Registered for ${coursecode} with faculty ${selectedProf}`);

      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const response = await axios.post('http://localhost:8080/addstudentcourse', {
          susername: loggedInUser,
          fusername: selectedProf,
          coursecode: coursecode,
        });
        console.log('Registration successful:', response.data);
      } catch (error) {
        console.error('Error during registration:', error);
      }
    } else {
      alert('Please select a faculty before registering');
    }
  };

  const loggedInUser = localStorage.getItem('loggedInUser');

  return (
    <div className="register-container">
      <h1>Course Registration</h1>
      <h2>Welcome, {loggedInUser ? loggedInUser : 'Guest'}</h2>

      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Select Faculty</th>
            <th>Register</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.coursecode}>
              <td>{course.coursecode}</td>
              <td>{course.coursename}</td>
              <td>
                <select
                  onChange={(e) => {
                    setSelectedFaculty({
                      ...selectedFaculty,
                      [course.coursecode]: e.target.value,
                    });
                  }}
                  disabled={registeredCourses.includes(course.coursecode)} 
                >
                  <option value="">Select Faculty</option>
                  {faculty.map((prof) => (
                    <option key={prof.username} value={prof.username}>
                      {prof.username}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleRegister(course.coursecode)}
                  disabled={registeredCourses.includes(course.coursecode)} 
                >
                  {registeredCourses.includes(course.coursecode) ? 'Registered' : 'Register'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .register-container {
          padding: 30px;
          max-width: 600px;
          margin: 80px auto; /* Center the container with margin */
          border: none;
          border-radius: 30px;
          box-shadow: 0 8px 15px rgba(5, 5, 0, 0.3);
          background-color: #fff; /* Added background color for better visibility */
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          border-radius:25px;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border: 1px solid #ccc;
        }
        th {
          background-color: #f4f4f4;
        }
        button {
          padding: 15px 25px;
          background-color: #000000;
          color: white;
          border: 2px solid black;
          border-radius: 35px;
          cursor: pointer;
        }
        button[disabled] {
          background-color: #ccc;
          cursor: not-allowed;
        }
        button:hover:not([disabled]) {
          background-color: transparent;
          border:2px solid black;
          color:black;
          transition:0.5s;
        }

        .register-container h1{
          font-weight:600;
          border:1px solid black;
          padding:10px;
          border-radius:40px;
        }
        .register-container h2{
          font-weight:300;
          margin-top:20px;
          margin-bottom:30px;
        }
      `}</style>
    </div>
  );
}
