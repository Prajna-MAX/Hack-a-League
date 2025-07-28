import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './seat.css';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';



const Seat = () => {
  const { employeeId } = useContext(AuthContext);
  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(null);


  // Fetch seats and bookings
  useEffect(() => {
    console.log(employeeId)
    const fetchSeats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/seats");
        const seatList = res.data.seats;

        const maxRow = Math.max(...seatList.map(s => s.row));
        const maxCol = Math.max(...seatList.map(s => s.col));

        const grid = Array.from({ length: maxRow + 1 }, () =>
          Array(maxCol + 1).fill(null)
        );

        seatList.forEach(seat => {
          grid[seat.row][seat.col] = seat;
        });

        setSeats(grid);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setBookedSeats(res.data.bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchSeats();
    fetchBookings();
  }, []);

  const toggleSeat = (row, col) => {
    const seat = seats[row]?.[col];
    if (!seat) return;

    const isBooked = bookedSeats.some(
      b => b.seatId === seat.seatId && b.date === selectedDate
    );

    if (isBooked) {
      alert("Seat already booked!");
      return;
    }

    setSelectedSeat(seat);
    alert(`Selected seat: ${seat.seatId}`);
  };

  const handleReserveSeats = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!selectedSeat) {
      alert("Please select a seat first.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/seats/reserve", {
        employeeId,
        seatId: selectedSeat.seatId,
        date: selectedDate,
      });

      alert("Seat reserved successfully!");

      // Refresh bookings
      const refreshed = await axios.get("http://localhost:5000/api/bookings");
      setBookedSeats(refreshed.data.bookings);
      setSelectedSeat(null);
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Seat already booked for this date.");
      } else {
        console.error(err);
        alert("Reservation failed.");
      }
    }
  };

  return (
    <div className="seat-container">
      <h2 className="classic-title">Seat Reservation System</h2>
      <div className="input-group">
        <label htmlFor="date-picker">Select Date:</label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="date-input"
        />
      </div>

      <div className="seat-grid">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, colIndex) => {
              const isBooked = bookedSeats.some(
                b => b.seatId === seat?.seatId && b.date === selectedDate
              );

              const isSelected = selectedSeat?.seatId === seat?.seatId;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`seat-box ${
                    isBooked ? "booked" : isSelected ? "selected" : "available"
                  }`}
                  onClick={() => toggleSeat(rowIndex, colIndex)}
                >
                  {seat ? seat.seatId.replace('S', '') : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button className="reserve-button" onClick={handleReserveSeats}>
        Reserve Selected Seat
      </button>
    </div>
  );
};

export default Seat;