import axios from "axios";
import { useState, useEffect } from "react";

export default function Viewpro() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/allpro");
                setResult(res.data);
            } catch (err) {
                setError("Error fetching data: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Show a loading message while fetching data
    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                Fetching result...
            </div>
        );
    }

    // Display an error message if there's an error
    if (error) {
        return (
            <div style={styles.errorContainer}>
                {error}
            </div>
        );
    }

    return (
        <div>
            <h2>Registered Users</h2>
            <table style={styles.table} border="0">
                <thead>
                    <tr>
                        <th style={styles.th}>User</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((obj, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{obj.username}</td>
                            <td style={styles.td}>{obj.email}</td>
                            <td style={styles.td}>{obj.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Inline CSS
const styles = {
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
};
