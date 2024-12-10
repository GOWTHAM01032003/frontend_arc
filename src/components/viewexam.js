import axios from "axios";
import { useState, useEffect } from "react";

export default function ViewExam() {
    const [result, setResult] = useState(null);

    // Fetch the exam data when the component loads
    useEffect(() => {
        if (result === null) {
            axios.get("http://localhost:8080/allexams", {}).then((res) => {
                setResult(res.data); // Set the fetched data into the state
            });
        }
    }, [result]);

    if (result === null) {
        return (
            <div style={styles.loadingContainer}>
                Fetching exams...
            </div>
        );
    } else {
        return (
            <div style={styles.container}>
                <table style={styles.table} border="0">
                    <thead>
                        <tr>
                            <th style={styles.th}>Publication Code</th>
                            <th style={styles.th}>Time</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Is Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((exam, index) => (
                            <tr key={index} style={styles.tr}>
                                <td style={styles.td}>{exam.examcoursecode}</td>
                                <td style={styles.td}>{exam.examtime}</td>
                                <td style={styles.td}>{exam.examdate}</td>
                                <td style={styles.td}>{exam.isactive}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

// Inline CSS
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#f9f9f9', // Optional light background color
        padding: '20px', // Padding around the container
        marginTop:'-100px'
    },
    loadingContainer: {
        textAlign: 'center',
        fontSize: '18px',
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
};
