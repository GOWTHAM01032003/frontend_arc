import axios from "axios";
import { useState, useEffect } from "react";

export default function Deletepro() {
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

    // Function to delete a user based on username
    const Deletefun = (username) => {
        axios.delete("http://localhost:8080/delete", {
            params: {
                username: username,
            }
        }).then((res) => {
            alert(res.data);
            setResult((prev) => prev.filter((obj) => obj.username !== username)); // Remove deleted user from the list
        }).catch((error) => {
            alert("Error deleting user: " + error.message);
        });
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                Fetching result...
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
        <div>
            <h2>Registered Users</h2>
            <table style={styles.table} border="0">
                <thead>
                    <tr>
                        <th style={styles.th}>User</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Password</th>
                        <th style={styles.th}>Profile Image</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((obj, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{obj.username}</td>
                            <td style={styles.td}>{obj.email}</td>
                            <td style={styles.td}>{obj.password}</td>
                            <td style={styles.td}>
                                {obj.image ? (
                                    <img
                                        src={`http://localhost:8080/images/${obj.image}`} // Assuming the image is stored and served from this URL
                                        alt={`${obj.username}'s profile`}
                                        style={styles.image}
                                    />
                                ) : (
                                    <p>No image available</p>
                                )}
                            </td>
                            <td style={styles.td}>
                                <button onClick={() => Deletefun(obj.username)}>DELETE</button>
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
        borderBottom: '0px solid #ddd', // Bottom border for headers
    },
    td: {
        padding: '15px 18px', // Padding for table cells
        borderBottom: '1px solid #ddd', // Bottom border for cells
        borderRadius: '30px',
    },
    image: {
        width: '50px', // Adjust image size
        height: '50px',
        borderRadius: '50%',
    },
};
