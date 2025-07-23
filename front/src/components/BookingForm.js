import React, { useState, useEffect } from 'react';

function DepartmentForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    departmentName: '',
    numSeats: 1,
    purpose: '',
    headOfDepartment: '',
    faculty: '',
  });
  const [seats, setSeats] = useState([]); // Seat grid
  const [availableSeats, setAvailableSeats] = useState([]); // Available seats from backend
  const [bookedSeats, setBookedSeats] = useState([]); // Track booked seats

  useEffect(() => {
    fetchBookedSeats(); // Fetch booked seats when component mounts
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "numSeats") {
      fetchAvailableSeats(Number(value));
    }
  };

  // Fetch available seats from backend
  const fetchAvailableSeats = async (numSeats) => {
    try {
      const response = await fetch("http://localhost:5000/api/available-seats/${numSeats}");
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

  // Fetch already booked seats from backend (or store locally)
  const fetchBookedSeats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/booked-seats");
      if (response.ok) {
        const data = await response.json();
        setBookedSeats(data);
      }
    } catch (error) {
      console.error('Error fetching booked seats:', error);
    }
  };

  // Function to book seats and update the state
  const bookSeats = async (numSeats) => {
    let newBookedSeats = [...bookedSeats];
    
    // Determine new seat numbers based on existing bookings
    let seatCounter = 1;
    while (newBookedSeats.length < numSeats) {
      if (!newBookedSeats.includes(seatCounter)) {
        newBookedSeats.push(seatCounter);
      }
      seatCounter++;
    }

    setBookedSeats(newBookedSeats); // Update state

    // Send updated booked seats to backend (optional)
    try {
      await fetch("http://localhost:5000/api/book-seat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookedSeats: newBookedSeats }),
      });
    } catch (error) {
      console.error("Error booking seats:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.departmentName || !formData.purpose) {
      alert("Department Name and Purpose are required!");
      return;
    }

    // Book seats
    bookSeats(Number(formData.numSeats));

    console.log("Department Data:", formData);
    setShowForm(false);
    alert("Department details submitted (check console)");
  };

  return (
    <div className="container">
      {!showForm && (
        <div>
          <h1>Create Department</h1>
          <button onClick={() => setShowForm(true)}>Create New Department</button>
        </div>
      )}

      {showForm && (
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

            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Seat Availability */}
      <div className="seat-recommendation">
        <h2>Booked Seats</h2>
        <div className="booked-seats">
          {bookedSeats.length > 0 ? (
            <ul>
              {bookedSeats.map((seat, index) => (
                <li key={index}>Seat Number: {seat} (Booked)</li>
              ))}
            </ul>
          ) : (
            <p>No seats booked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentForm;