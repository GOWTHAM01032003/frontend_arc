import axios from "axios";
import { useState, useEffect } from "react";

export default function Editpro() {
    const [result, setResult] = useState(null);
    const [editData, setEditData] = useState({ username: '', email: '', password: '' });
    const [isEditing, setIsEditing] = useState(false);
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

    const Editfun = (username, email, password) => {
        setEditData({ username, email, password });
        setIsEditing(true);
    };

    const saveEdit = async () => {
        try {
            const res = await axios.put("http://localhost:8080/update", {
                username: editData.username,
                email: editData.email,
                password: editData.password,
            });
            alert(res.data);
            setResult(null); // Refresh the data
            setIsEditing(false); // Close the edit form
        } catch (err) {
            alert("Error updating user: " + err.message);
        }
    };

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
            <h2>Edit Users</h2>
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
                        <tr key={index}>
                            <td style={styles.td}>{obj.username}</td>
                            <td style={styles.td}>{obj.email}</td>
                            <td style={styles.td}>{obj.password}</td>
                            <td>
                                <button onClick={() => Editfun(obj.username, obj.email, obj.password)}>EDIT</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <div id="edit">
                    <h3>Edit User</h3>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="e_name" value={editData.username} readOnly />
                        <br />
                        <label>Email:</label>
                        <input type="text" name="e_email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                        <br />
                        <label>Password:</label>
                        <input type="text" name="e_pass" value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} />
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
        borderCollapse: 'collapse',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        
    },
    th: {
        backgroundColor: '#000000',
        color: 'white',
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
    },
    td: {
        padding: '12px 15px',
        borderBottom: '1px solid #ddd',
    },
};
