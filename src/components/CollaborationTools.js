import React, { useState } from "react";

const CollaborationTools = () => {
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({ status: "all" });
  const [newTeam, setNewTeam] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    status: "pending",
  });

  // Add a new team
  const addTeam = () => {
    if (newTeam.trim()) {
      setTeams([...teams, { id: Date.now(), name: newTeam }]);
      setNotifications([
        ...notifications,
        { id: Date.now(), message: `Team "${newTeam}" added.` },
      ]);
      setNewTeam("");
    }
  };

  // Add a new task
  const addTask = () => {
    if (newTask.title.trim() && newTask.assignedTo.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNotifications([
        ...notifications,
        { id: Date.now(), message: `Task "${newTask.title}" created.` },
      ]);
      setNewTask({ title: "", assignedTo: "", status: "pending" });
    }
  };

  // Update task status
  const updateTaskStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    const task = tasks.find((t) => t.id === id);
    setNotifications([
      ...notifications,
      { id: Date.now(), message: `Task "${task.title}" marked as ${newStatus}.` },
    ]);
  };

  // Filter tasks based on status
  const filteredTasks =
    filters.status === "all"
      ? tasks
      : tasks.filter((task) => task.status === filters.status);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Collaboration Tools</h1>
      <div style={styles.content}>
        <div style={styles.mainContent}>
          {/* Team Management */}
          <div style={styles.section}>
            <h2 style={styles.subHeading}>Team Management</h2>
            <input
              type="text"
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
              placeholder="Add a new team"
              style={styles.input}
            />
            <button onClick={addTeam} style={styles.button}>
              Add Team
            </button>
            <div style={styles.listContainer}>
              {teams.map((team) => (
                <p key={team.id} style={styles.listItem}>
                  {team.name}
                </p>
              ))}
            </div>
          </div>

          {/* Task Management */}
          <div style={styles.section}>
            <h2 style={styles.subHeading}>Task Management</h2>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Task Title"
              style={styles.input}
            />
            <input
              type="text"
              value={newTask.assignedTo}
              onChange={(e) =>
                setNewTask({ ...newTask, assignedTo: e.target.value })
              }
              placeholder="Assign to"
              style={styles.input}
            />
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              style={styles.select}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={addTask} style={styles.button}>
              Add Task
            </button>
            <div>
              <h3 style={styles.subHeading}>Tasks</h3>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                style={styles.select}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div style={styles.taskContainer}>
                {filteredTasks.map((task) => (
                  <div key={task.id} style={styles.card}>
                    <h4>{task.title}</h4>
                    <p>
                      <strong>Assigned To:</strong> {task.assignedTo}
                    </p>
                    <p>
                      <strong>Status:</strong> {task.status}
                    </p>
                    {task.status !== "completed" && (
                      <button
                        onClick={() =>
                          updateTaskStatus(
                            task.id,
                            task.status === "pending"
                              ? "in-progress"
                              : "completed"
                          )
                        }
                        style={styles.button}
                      >
                        Mark as{" "}
                        {task.status === "pending" ? "In Progress" : "Completed"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Pane */}
        <div style={styles.notificationPane}>
          <div style={styles.notificationHeader}>
            <h2 style={styles.subHeading}>Notifications</h2>
            <span style={styles.notificationIcon}>🔔</span>
          </div>
          <div style={styles.listContainer}>
            {notifications.map((notification) => (
              <p key={notification.id} style={styles.listItem}>
                {notification.message}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline CSS for styling
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundImage:
      "url('https://www.icolorpalette.com/download/solidcolorimage/cedcd6_solid_color_background_icolorpalette.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#000000",
  },
  heading: {
    textAlign: "center",
    fontSize: "2em",
    marginBottom: "20px",
    borderBottom: "2px solid #000",
    paddingBottom: "10px",
  },
  content: {
    display: "flex",
    gap: "20px",
  },
  mainContent: {
    flex: 2,
  },
  notificationPane: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: "15px",
    borderRadius: "4px",
    border: "1px solid #000",
  },
  notificationHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  notificationIcon: {
    fontSize: "20px",
    cursor: "pointer",
  },
  section: {
    marginBottom: "30px",
    border: "1px solid #000",
    padding: "15px",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  subHeading: {
    fontSize: "1.5em",
    marginBottom: "10px",
    borderBottom: "1px solid #000",
    paddingBottom: "5px",
  },
  input: {
    padding: "10px",
    margin: "5px 0",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "4px",
    border: "1px solid #000",
  },
  select: {
    padding: "10px",
    margin: "5px 0",
    borderRadius: "4px",
    border: "1px solid #000",
    width: "100%",
    maxWidth: "400px",
  },
  button: {
    padding: "10px 20px",
    margin: "10px 0",
    borderRadius: "4px",
    backgroundColor: "#000",
    color: "#fff",
    border: "1px solid #000",
    cursor: "pointer",
  },
  listContainer: {
    marginTop: "10px",
  },
  listItem: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "5px",
    border: "1px solid #000",
  },
  taskContainer: {
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #000",
  },
};

export default CollaborationTools;
