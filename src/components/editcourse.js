import axios from "axios";
import { useState, useEffect } from "react";

export default function EditCourse() {
    const [result, setResult] = useState(null);
    const [editData, setEditData] = useState({ coursecode: '', coursename: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("http://localhost:8080/allcourses");
                setResult(res.data);
            } catch (err) {
                setError("Error fetching courses: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Function to start editing a course
    const Editfun = (coursecode, coursename) => {
        setEditData({ coursecode, coursename });
        setIsEditing(true);
    };

    // Function to save the edited course
    const saveEdit = () => {
        axios.put("http://localhost:8080/updateCourse", {
            coursecode: editData.coursecode,
            coursename: editData.coursename,
        }).then((res) => {
            alert(res.data);
            setResult(null); // Refresh the data after saving
            setIsEditing(false); // Close the edit form
        }).catch((error) => {
            alert("Error updating course: " + error.message);
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
            <h2>Edit Courses</h2>
            <table style={styles.table} border="0">
                <thead>
                    <tr>
                        <th style={styles.th}>Course Code</th>
                        <th style={styles.th}>Course Name</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((course, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{course.coursecode}</td>
                            <td style={styles.td}>{course.coursename}</td>
                            <td style={styles.td}>
                                <button onClick={() => Editfun(course.coursecode, course.coursename)}>EDIT</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <div id="edit" style={styles.editContainer}>
                    <h3>Edit Course</h3>
                    <div>
                        <label>Course Code:</label>
                        <input type="text" value={editData.coursecode} readOnly />
                        <br />
                        <label>Course Name:</label>
                        <input type="text" value={editData.coursename} onChange={(e) => setEditData({ ...editData, coursename: e.target.value })} />
                        <br />
                        <button onClick={saveEdit}>SAVE EDIT</button>
                        <button onClick={() => setIsEditing(false)}>CANCEL</button>
                    </div>
                </div>
            )}
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
        backgroundColor: '#000000', // Header background color
        color: 'white', // Header text color
        padding: '12px 15px', // Padding for headers
        textAlign: 'left', // Align text to the left
        borderBottom: '2px solid #ddd', // Bottom border for headers
    },
    td: {
        padding: '12px 15px', // Padding for table cells
        borderBottom: '1px solid #ddd', // Bottom border for cells
    },
    editContainer: {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
};
