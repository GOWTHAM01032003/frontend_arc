import axios from "axios";
import { useState, useEffect } from "react";

export default function DelStu() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the student data when the component loads
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get("http://localhost:8080/allstu");
                setResult(res.data); // Set the fetched data into the state
            } catch (err) {
                setError("Error fetching students: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const deleteFun = async (username) => {
        try {
            const res = await axios.delete("http://localhost:8080/delete", {
                params: {
                    username: username
                }
            });
            alert(res.data);
            setResult(prev => prev.filter(student => student.username !== username)); // Update the state to remove the deleted student
        } catch (err) {
            alert("Error deleting student: " + err.message);
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                Fetching students...
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
                        <th style={styles.th}>User</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Password</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((obj, index) => (
                        <tr key={index} style={styles.tr}>
                            <td style={styles.td}>{obj.username}</td>
                            <td style={styles.td}>{obj.email}</td>
                            <td style={styles.td}>{obj.password}</td>
                            <td style={styles.td}>
                                <button style={styles.button} onClick={() => deleteFun(obj.username)}>DELETE</button>
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
    tr: {
        transition: 'background 0.3s ease', // Transition for hover effect
        '&:hover': {
            backgroundColor: '#f1f1f1', // Hover effect color
        },
    },
    button: {
        backgroundColor: '#000000', // Red background for delete button
        color: 'white', // White text color
        padding: '8px 12px', // Padding for the button
        border: 'none', // No border
        borderRadius: '34px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
    },
};

