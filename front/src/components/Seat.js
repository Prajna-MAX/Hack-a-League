import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './seat.css';

const rows = 5;
const cols = 5;

function Seat() {
  const [seats, setSeats] = useState(Array(rows).fill(null).map(() => Array(cols).fill(false)));
  const [bookedSeats, setBookedSeats] = useState([]); // Stores seats already booked for selected date
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
  const navigate = useNavigate();

  // Fetch booked seats from backend when date changes
  useEffect(() => {
    axios.post('http://localhost:5000/api/seats/get-booked', { date: selectedDate })
      .then(response => setBookedSeats(response.data.bookedSeats))
      .catch(error => console.error("Error fetching booked seats:", error));
  }, [selectedDate]);

  // Toggle seat selection
  const toggleSeat = (row, col) => {
    if (bookedSeats.some(seat => seat.row === row && seat.col === col)) {
      alert("This seat is already booked!");
      return;
    }

    const updatedSeats = seats.map((seatRow, rIndex) =>
      seatRow.map((seat, cIndex) =>
        rIndex === row && cIndex === col ? !seat : seat
      )
    );
    setSeats(updatedSeats);
  };

  // Handle seat reservation
  const handleReserveSeats = () => {
    const selectedSeats = [];
    seats.forEach((row, rowIndex) => {
      row.forEach((seat, colIndex) => {
        if (seat) {
          selectedSeats.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (selectedSeats.length === 0) {
      alert("No seats selected!");
      return;
    }

    axios.post('http://localhost:5000/api/seats/reserve', {
      date: selectedDate,
      seats: selectedSeats
    })
      .then(response => {
        alert(response.data.message);
        setBookedSeats([...bookedSeats, ...selectedSeats]); // Update UI
      })
      .catch(error => console.error("Error reserving seats:", error));
  };

  return (
    <>
      <div className="seat-recommendation">
        <h2>Seat Reservation System</h2>
        <p>Select a date and reserve your seats.</p>

        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()} // Prevent past bookings
        />

        <div className="seat-grid">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((isSelected, colIndex) => {
                const isBooked = bookedSeats.some(seat => seat.row === rowIndex && seat.col === colIndex);
                return (
                  <div
                    key={colIndex}
                    className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                    onClick={() => toggleSeat(rowIndex, colIndex)}
                  >
                    {rowIndex * cols + colIndex + 1}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <button onClick={handleReserveSeats}>Reserve Seats</button>
      </div>
    </>
  );
}

export default Seat;
