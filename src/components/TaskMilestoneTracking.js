import React, { useState } from 'react';

const TestMilestoneTracking = () => {
  const [milestones, setMilestones] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    deadline: '',
    status: 'pending',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, deadline, status } = formData;

    if (!description || !status) {
      setError('All fields are required.');
      return;
    }

    setMilestones([
      ...milestones,
      { description, deadline, status, id: Date.now() },
    ]);
    setFormData({ description: '', deadline: '', status: 'pending' });
    setError('');
  };

  const handleDelete = (id) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id));
  };

  const handleEdit = (id, newStatus) => {
    setMilestones(
      milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, status: newStatus } : milestone
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Test Milestone Tracking</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Milestone Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter milestone description"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Deadline (Optional)</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Add Milestone
        </button>
      </form>

      <div style={styles.milestoneContainer}>
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <div style={styles.card} key={milestone.id}>
              <div style={styles.cardHeader}>
                <h4>{milestone.description}</h4>
                <button
                  onClick={() => handleDelete(milestone.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardText}>
                  <strong>Status:</strong> {milestone.status}
                </p>
                {milestone.deadline && (
                  <p style={styles.cardText}>
                    <strong>Deadline:</strong> {milestone.deadline}
                  </p>
                )}
                <div style={styles.cardActions}>
                  {milestone.status !== 'completed' && (
                    <button
                      onClick={() => handleEdit(milestone.id, 'completed')}
                      style={styles.editButton}
                    >
                      Mark as Completed
                    </button>
                  )}
                  {milestone.status !== 'in-progress' && milestone.status !== 'completed' && (
                    <button
                      onClick={() => handleEdit(milestone.id, 'in-progress')}
                      style={styles.editButton}
                    >
                      Mark as In Progress
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No milestones to track.</p>
        )}
      </div>
    </div>
  );
};

// Inline CSS styles (with background image applied)
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url("https://www.icolorpalette.com/download/solidcolorimage/cedcd6_solid_color_background_icolorpalette.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '8px',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    color: '#000',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    border: '1px solid #000',
    width: '100%',
    maxWidth: '600px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #000',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '1px solid #000',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    fontSize: '16px',
    color: '#000',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  milestoneContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '2px solid #000',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBody: {
    marginTop: '10px',
  },
  cardText: {
    fontSize: '16px',
    color: '#000',
  },
  cardActions: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default TestMilestoneTracking;
