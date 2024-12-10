import axios from "axios";
import { useState, useEffect } from "react";

export default function ViewCourses() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch course data on component load
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

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                Fetching courses...
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
            <table style={styles.table} border="0">
                <thead>
                    <tr>
                        <th style={styles.th}>Course Name</th>
                        <th style={styles.th}>Course Code</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((obj, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{obj.coursename}</td>
                            <td style={styles.td}>{obj.coursecode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <br />
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
        marginTop:'-100px'
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
};
