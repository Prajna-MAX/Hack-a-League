import React, { useState, useEffect } from 'react';
import './deptForm.css'; // Import the new CSS

function DepartmentForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    departmentName: '',
    numSeats: 1, 
    purpose: '',
    headOfDepartment: '',
    faculty: '',
  });
  const [availableSeats, setAvailableSeats] = useState([]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "numSeats") {
      fetchAvailableSeats(Number(value));
    }
  };

  const fetchAvailableSeats = async (numSeats) => {
    try {
      const response = await fetch(`http://localhost:5000/api/available-seats/${numSeats}`);

      if (response.ok) {
        const data = await response.json();
        setAvailableSeats(data);
      } else {
        setAvailableSeats([]);
      }
    } catch (error) {
      console.error('Error fetching available seats:', error);
      setAvailableSeats([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   

    console.log("Department Data:", formData);
    setFormData({
      departmentName: '',
      numSeats: 1,
      purpose: '',
      headOfDepartment: '',
      faculty: '',
    });
    setShowForm(false); 
    alert("Department details submitted (check console)");
  };

  return (
    <div className="container">
      <div>
        {!showForm && (
          <div>
            <h1>Allocating Seats for Departments</h1>
            <button onClick={() => setShowForm(true)}>Allocate</button>
          </div>
        )}

        {showForm && (
          <div id="departmentForm">
            <form onSubmit={handleSubmit}>
              <label htmlFor="numSeats">Number of Seats:</label>
              <input
                type="number"
                id="numSeats"
                name="numSeats"
                value={formData.numSeats}
                onChange={handleInputChange}
                min="1"
                required
              />
            <div className="button-container"></div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>

      <div className="seat-recommendation">
        <h2>Available Seats</h2>
        <div className="available-seats">
          {availableSeats.length > 0 ? (
            <ul>
              {availableSeats.map((seat, index) => (
                <li key={index}>Seat Number: {seat}</li>
              ))}
            </ul>
          ) : (
            <p>No available seats found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentForm;
