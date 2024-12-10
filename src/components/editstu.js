import axios from "axios";
import { useState, useEffect } from "react";

export default function EditStu() {
    const [result, setResult] = useState(null);
    const [editData, setEditData] = useState({ username: '', email: '', password: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch student data on component load
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

    const editFun = (username, email, password) => {
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
            setResult(prev => prev.map(student => (student.username === editData.username ? editData : student))); // Update the specific student in the state
            setIsEditing(false); // Close the edit form
        } catch (err) {
            alert("Error updating student: " + err.message);
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
                        <tr key={index}>
                            <td style={styles.td}>{obj.username}</td>
                            <td style={styles.td}>{obj.email}</td>
                            <td style={styles.td}>{obj.password}</td>
                            <td style={styles.td}>
                                <button style={styles.button} onClick={() => editFun(obj.username, obj.email, obj.password)}>EDIT</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <br />
            {isEditing && (
                <div id="edit" style={styles.editContainer}>
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
                        <button style={styles.saveButton} onClick={saveEdit}>SAVE EDIT</button>
                        <button style={styles.cancelButton} onClick={() => setIsEditing(false)}>CANCEL</button>
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
    button: {
        backgroundColor: '#000000', // Green background for edit button
        color: 'white', // White text color
        padding: '8px 12px', // Padding for the button
        border: 'none', // No border
        borderRadius: '34px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
    },
    editContainer: {
        marginTop: '20px',
        padding: '15px',
        border: '1px solid #ddd', // Border for edit form
        borderRadius: '4px', // Rounded corners for the edit form
        backgroundColor: '#ffffff', // White background for the edit form
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for the edit form
    },
    saveButton: {
        backgroundColor: '#4CAF50', // Green background for save button
        color: 'white', // White text color
        padding: '8px 12px', // Padding for the button
        border: 'none', // No border
        borderRadius: '4px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
    },
    cancelButton: {
        marginLeft: '10px',
        backgroundColor: '#f44336', // Red background for cancel button
        color: 'white', // White text color
        padding: '8px 12px', // Padding for the button
        border: 'none', // No border
        borderRadius: '4px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
    },
};
