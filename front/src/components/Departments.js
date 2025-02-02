import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Departments.css'; // Import the new CSS file

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/departments'); // Update with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <p className="loading-message">Loading departments...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="departments-container">
      <h2 className="departments-title">Select a Department</h2>
      <div className="departments-list">
        {departments.map((dept) => (
          <button 
            key={dept.id} 
            className="department-button"
            onClick={() => navigate(`/deptform/${dept.id}`)} 
          >
            {dept.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Departments;
