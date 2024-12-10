import React, { useEffect, useState } from "react";
import axios from "axios";

// Function to generate a random gradient
const getRandomGradient = () => {
    const colors = [
        ["#FF5733", "#FFC300"], // Orange to Yellow
        ["#DAF7A6", "#FFC300"], // Light Green to Yellow
        ["#33FF57", "#33C6FF"], // Green to Light Blue
        ["#FF33A8", "#FF5733"], // Pink to Orange
        ["#339BFF", "#6A11CB"], // Blue to Purple
        ["#57C7FF", "#5D8EBF"], // Light Blue to Dark Blue
        ["#FF33D1", "#6A11CB"], // Pink to Purple
        ["#FFD700", "#FF8C00"], // Gold to Dark Orange
    ];

    // Randomly select a gradient from the colors array
    const randomIndex = Math.floor(Math.random() * colors.length);
    return `linear-gradient(to bottom right, ${colors[randomIndex][0]}, ${colors[randomIndex][1]})`;
};

const ViewStudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [student, setStudent] = useState(null); // State for storing student details
    const [loading, setLoading] = useState(true); // To manage loading state

    useEffect(() => {
        fetchStudent(); // Fetch student details on component mount
    }, []);

    // Function to fetch student details
    const fetchStudent = async () => {
        try {
            const loggedInUser = localStorage.getItem("loggedInUser"); // Get the logged-in user
            const response = await axios.get(`http://localhost:8080/allcourses`); // Adjust the endpoint accordingly
            setStudent(response.data);
            fetchCourses(); // Fetch courses after fetching student
        } catch (error) {
            console.error("Error fetching student details:", error);
            setLoading(false); // Set loading to false on error
        }
    };

    // Function to fetch courses
    const fetchCourses = async () => {
        try {
            const loggedInUser = localStorage.getItem("loggedInUser"); // Get the logged-in user
            const response = await axios.get(`http://localhost:8080/getstudentcourses`); // Adjust the endpoint accordingly
            setCourses(response.data);
            setLoading(false); // Set loading to false after fetching courses
        } catch (error) {
            console.error("Error fetching student courses:", error);
            setLoading(false); // Set loading to false on error
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading message
    }

    return (
        <div className="course-container">
            <h1>Registered Courses</h1>
            
            <div className="cards-container">
                {courses.map((course, index) => (
                    <div className="card" key={index} style={{ background: getRandomGradient() }}>
                        <div className="card-content">
                            <div className="course-details">
                                <h2>{course.coursename}</h2>
                                <br></br>
                                <br></br>
                                <br></br>
                                <p>Course Code: {course.coursecode}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .course-container {
                    padding: 20px;
                    max-width: 800px;
                    margin: auto;
                    text-align: center;
                }

                .cards-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Increased min width */
                    gap: 30px; /* Increased gap between cards */
                }

                .card {
                    border-radius: 15px; /* Slightly larger radius */
                    padding: 15px; /* Increased padding for larger cards */
                    color: white;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* More pronounced shadow */
                    transition: transform 0.3s; /* Slightly slower transition */
                    min-height: 200px; /* Minimum height for the card */
                    display: flex;
                    flex-direction: column; /* Allow flexbox layout */
                    justify-content: space-between; /* Space between elements */
                    text-align: center; /* Center text within the card */
                }

                .card:hover {
                    transform: translateY(-10px); /* Slightly larger lift effect on hover */
                }

                .course-details {
                    margin-top: auto; /* Push course details to the bottom */
                }

                h2 {
                    margin: 0 0 5px 0; /* Margin adjustments */
                    font-size: 1.5em; /* Increased font size */
                }

                p {
                    margin: 0; /* Remove default margin */
                    font-size: 1.2em; /* Increased font size */
                }
                .course-container h1{
                    border:1px solid black;
                    padding:10px;
                    border-radius:45px;
                    font-size:600;
                }
            `}</style>
        </div>
    );
};

export default ViewStudentCourses;
