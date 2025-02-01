import React, { useState } from 'react';

function DepartmentForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    departmentName: '',
    numSeats: 1, // Default to 1
    purpose: '',
    headOfDepartment: '',
    faculty: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic form validation (you can improve this)
    if (!formData.departmentName || !formData.purpose) {
      alert("Department Name and Purpose are required!");
      return;
    }
    
    console.log("Department Data:", formData); // Placeholder: Send data to server here

    // Reset form after submit (optional)
    setFormData({
      departmentName: '',
      numSeats: 1,
      purpose: '',
      headOfDepartment: '',
      faculty: '',
    });
    setShowForm(false); // Hide the form
    alert("Department details submitted (check console)");
  };

  return (
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
  );
}

export default DepartmentForm;
