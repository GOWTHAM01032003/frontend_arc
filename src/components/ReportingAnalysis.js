import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ReportingAnalysis = () => {
  const [dataType, setDataType] = useState('monthly');
  const [journalType, setJournalType] = useState('research');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [reportData, setReportData] = useState(getInitialData(dataType, journalType));

  const handleDataTypeChange = (event) => {
    const selectedType = event.target.value;
    setDataType(selectedType);
    setReportData(getInitialData(selectedType, journalType));
  };

  const handleJournalTypeChange = (event) => {
    const selectedJournal = event.target.value;
    setJournalType(selectedJournal);
    setReportData(getInitialData(dataType, selectedJournal));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = reportData.labels
    .map((label, index) => {
      if (label.toLowerCase().includes(searchTerm)) {
        return {
          label,
          value: reportData.datasets[0].data[index],
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  const filteredLabels = filteredData.map((item) => item.label);
  const filteredValues = filteredData.map((item) => item.value);

  const filteredReportData = {
    labels: filteredLabels,
    datasets: [
      {
        label: reportData.datasets[0].label,
        data: filteredValues,
        backgroundColor: '#76C7C0',
        borderColor: '#4F646F',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Reporting Analysis</h1>

      {/* Data Type Dropdown */}
      <div style={styles.dropdownContainer}>
        <label style={styles.dropdownLabel}>Select Data Type: </label>
        <select style={styles.dropdown} value={dataType} onChange={handleDataTypeChange}>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="daywise">Day-wise</option>
        </select>
      </div>

      {/* Journal Type Dropdown */}
      <div style={styles.dropdownContainer}>
        <label style={styles.dropdownLabel}>Select Journal Type: </label>
        <select style={styles.dropdown} value={journalType} onChange={handleJournalTypeChange}>
          <option value="research">Research Journals</option>
          <option value="review">Review Journals</option>
          <option value="technical">Technical Journals</option>
        </select>
      </div>

      {/* Search Input */}
      <div style={styles.searchContainer}>
        <label style={styles.searchLabel}>Search: </label>
        <input
          type="text"
          placeholder="Search data"
          style={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Chart */}
      <div style={styles.chartContainer}>
        <h2 style={styles.chartHeading}>Data Trends</h2>
        <Bar data={filteredReportData} options={chartOptions} />
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <h2 style={styles.tableHeading}>Detailed Data</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Label</th>
              <th style={styles.tableHeader}>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{item.label}</td>
                <td style={styles.tableCell}>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Function to return initial data based on type
const getInitialData = (dataType, journalType) => {
  const journalData = {
    research: [65, 59, 80, 81, 56],
    review: [45, 50, 70, 72, 60],
    technical: [75, 85, 90, 88, 95],
  };

  const yearlyLabels = ['2020', '2021', '2022', '2023', '2024'];
  const daywiseLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
  const monthlyLabels = ['January', 'February', 'March', 'April', 'May'];

  const labels = dataType === 'yearly' ? yearlyLabels : dataType === 'daywise' ? daywiseLabels : monthlyLabels;

  return {
    labels: labels,
    datasets: [
      {
        label: `${journalType} Data Analysis`,
        data: journalData[journalType],
        backgroundColor: '#76C7C0',
        borderColor: '#4F646F',
        borderWidth: 2,
      },
    ],
  };
};

const chartOptions = {
  responsive: true,
  scales: {
    y: { beginAtZero: true, grid: { color: '#CEDCD6' } },
    x: { grid: { color: '#CEDCD6' } },
  },
  plugins: {
    title: { display: true, text: 'Data Analysis', color: '#4F646F' },
  },
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#CEDCD6',
    color: '#4F646F',
    borderRadius: '10px',
  },
  heading: { textAlign: 'center', fontSize: '2.5em', marginBottom: '30px' },
  dropdownContainer: { marginBottom: '20px', textAlign: 'center' },
  dropdownLabel: { fontSize: '1.2em', marginRight: '10px' },
  dropdown: { padding: '10px', fontSize: '1em' },
  searchContainer: { marginBottom: '20px', textAlign: 'center' },
  searchLabel: { fontSize: '1.2em', marginRight: '10px' },
  searchInput: { padding: '10px', fontSize: '1em' },
  chartContainer: { padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '10px' },
  tableContainer: { marginBottom: '40px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#4F646F', color: '#CEDCD6', padding: '10px' },
  tableCell: { padding: '10px', borderBottom: '1px solid #4F646F' },
};

export default ReportingAnalysis;
