import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

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

  if (loading) return <p>Loading departments...</p>;
 

  return (
    <div>
      {departments.map((dept) => (
        <button 
          key={dept.id} 
          onClick={() => navigate(`/deptform/${dept.id}`)} // Navigate to deptform with ID
        >
          {dept.name}
        </button>
      ))}
    </div>
  );
}

export default Departments;
