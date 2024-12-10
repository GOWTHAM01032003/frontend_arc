import axios from "axios";
import { useState, useEffect } from "react";

export default function DeleteCourse() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the list of courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("http://localhost:8080/allcourses");
                setResult(res.data); // Set the fetched data into the state
            } catch (err) {
                setError("Error fetching courses: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Function to handle the deletion of a course based on coursecode
    const DeleteCourseFun = (coursecode) => {
        axios.delete("http://localhost:8080/deleteCourse", {
            params: {
                coursecode: coursecode, // Correct field name as per your database
            }
        }).then((res) => {
            alert(res.data);
            setResult(null); // Refresh the list after deletion
        }).catch((error) => {
            alert("Error deleting course: " + error.message);
        });
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                Fetching course data...
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorContainer}>
                {error}
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2>Available Courses</h2>
            <table style={styles.table} border="0">
                <thead>
                    <tr>
                        <th style={styles.th}> Username</th>
                        <th style={styles.th}>Publication Code</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((course, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{course.coursename}</td>
                            <td style={styles.td}>{course.coursecode}</td>
                            <td style={styles.td}>
                                <button onClick={() => DeleteCourseFun(course.coursecode)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Inline CSS
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#f9f9f9', // Light background color
        padding: '20px', // Padding around the container
        marginTop:'-100px'
    },
    loadingContainer: {
        textAlign: 'center',
        fontSize: '18px',
        marginTop: '20px',
    },
    errorContainer: {
        color: 'red',
        textAlign: 'center',
        fontSize: '16px',
        marginTop: '20px',
    },
    table: {
        borderCollapse: 'collapse', // Better table aesthetics
        width: '100%', // Full width to fit the screen
        maxWidth: '800px', // Optional max width for better layout
        margin: '0 auto', // Centering the table
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for a professional look
    },
    th: {
        backgroundColor: 'black', // Header background color
        color: 'white', // Header text color
        padding: '12px 15px', // Padding for headers
        textAlign: 'left', // Align text to the left
        borderBottom: '2px solid #ddd', // Bottom border for headers
    },
    td: {
        padding: '12px 15px', // Padding for table cells
        borderBottom: '1px solid #ddd', // Bottom border for cells
    },
};
