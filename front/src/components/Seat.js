import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';
import './seat.css'


const SeatMap = ({ seats, onSeatSelect }) => {
    console.log("Fetched Seats Data:", seats);  // Check the data in the console
  
    if (!seats || seats.length === 0) {
      return <p>No seats available</p>;  
    }
  
    return (
      <div className="seat-map">
        {seats.map((seat) => (
          <div
            key={seat._id}  // Ensure key is unique
            className={`seat ${seat.status}`} // Conditional classes based on status
            onClick={() => onSeatSelect(seat)}  // Handle click to select a seat
          >
           <p> {seat.name} </p> 
          </div>
        ))}
      </div>
    );
  };
  


const Seat = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/api/seats').then((response) => {console.log("seats fetched");setSeats(response.data)});
  }, []);

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  const handleBooking = (bookingData) => {
    console.log(bookingData);
    axios
      .post('http://localhost:5000/api/book', bookingData)
      .then((response) => {
        alert('Seat booked successfully!');
        setSelectedSeat(null);  // Reset selected seat after booking
      })
      .catch((error) => {
        console.error('Error booking seat:', error);
        alert('Failed to book the seat. Please try again.');
      });
  };
  

  return (
    <div>
  <h1>Open Seating System</h1>
  <SeatMap seats={seats} onSeatSelect={handleSeatSelect} />
  <button onClick={() => setShowBookingForm(true)}>Dynamic Book</button>

{showBookingForm && (
  <BookingForm selectedSeat={selectedSeat} onSubmit={handleBooking} />
)}

  
</div>
  );
};

export default Seat;