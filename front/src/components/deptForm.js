import React, { useState, useEffect } from 'react';

function DepartmentForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    departmentName: '',
    numSeats: 1, // Default to 1 seat
    purpose: '',
    headOfDepartment: '',
    faculty: '',
  });
  const [seats, setSeats] = useState([]); // Empty array for seat grid
  const [availableSeats, setAvailableSeats] = useState([]); // To store available seats from backend
  const [submit, setSubmit] = useState(false);
  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "numSeats") {
      // Update seat grid when number of seats is changed
      generateSeats(Number(value));  // Call generateSeats
      fetchAvailableSeats(Number(value)); // Fetch available seats when numSeats changes
    }
  };

  // Function to generate seat grid dynamically based on number of seats
  const generateSeats = (numSeats) => {
    const numRows = Math.ceil(numSeats / 5); // Assuming 5 seats per row for simplicity
    const newSeats = Array.from({ length: numRows }, (_, rowIndex) => {
      return Array.from({ length: 5 }, (_, colIndex) => {
        return rowIndex * 5 + colIndex < numSeats ? false : null; // True means occupied, false means available
      });
    });
    setSeats(newSeats);
  };

  // Function to fetch available seats from backend
  const fetchAvailableSeats = async (numSeats) => {
    try {
        const response = await fetch(`http://localhost:5000/api/available-seats/${numSeats}`);

      if (response.ok) {
        const data = await response.json();
        setAvailableSeats(data); // Set available seats from response
      } else {
        setAvailableSeats([]); // No available seats found or error
      }
    } catch (error) {
      console.error('Error fetching available seats:', error);
      setAvailableSeats([]); // Handle error case
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.departmentName || !formData.purpose) {
      alert("Department Name and Purpose are required!");
      return;
    }

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

  useEffect(() => {
    // Generate initial seat grid and fetch available seats when the component is mounted
    generateSeats(formData.numSeats);
    fetchAvailableSeats(formData.numSeats);
  }, submit); // Run only once on mount

  return (
    <div className="container">
      <div>
        {!showForm && (
          <div>
            <h1>Create Department</h1>
            <button onClick={() => setShowForm(true)}>Create New Department</button>
          </div>
        )}

        {showForm && ( // Conditionally render the form
          <div id="departmentForm">
            <form onSubmit={handleSubmit}>
              <label htmlFor="departmentName">Department Name:</label>
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleInputChange}
                required
              /><br /><br />

              <label htmlFor="numSeats">Number of Seats:</label>
              <input
                type="number"
                id="numSeats"
                name="numSeats"
                value={formData.numSeats}
                onChange={handleInputChange}
                min="1"
                required
              /><br /><br />

              <label htmlFor="purpose">Purpose:</label>
              <textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                rows="4"
                required
              ></textarea><br /><br />

              <label htmlFor="faculty">Faculty (comma-separated):</label>
              <input
                type="text"
                id="faculty"
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
              /><br /><br />

              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>

      {/* Seat Availability */}
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