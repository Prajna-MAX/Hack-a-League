import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeatRecommendation.css';

const rows = 5;
const cols = 5;

function SeatRecommendation() {
  const [seats, setSeats] = useState(() => {
    const savedSeats = localStorage.getItem("seatData");
    return savedSeats ? JSON.parse(savedSeats) : Array(rows).fill(null).map(() => Array(cols).fill(false));
  });

  const navigate = useNavigate();

  // Count selected (occupied) seats
  const selectedSeatsCount = seats.flat().filter(seat => seat).length;

  // Update local storage whenever seats change
  useEffect(() => {
    localStorage.setItem("seatData", JSON.stringify(seats));
  }, [seats]);

  const toggleSeat = (row, col) => {
    const updatedSeats = seats.map((seatRow, rIndex) =>
      seatRow.map((seat, cIndex) =>
        rIndex === row && cIndex === col ? !seat : seat
      )
    );
    setSeats(updatedSeats);
  };

  const handleProceedToCostSaving = () => {
    navigate('/cost-saving', { state: { selectedSeatsCount } });
  };

  const handleProceedToEnergy = () => {
    navigate('/power-consumption', { state: { selectedSeatsCount } });
  };

  const handleRefresh = () => {
    const savedSeats = localStorage.getItem("seatData");
    if (savedSeats) {
      setSeats(JSON.parse(savedSeats));
    } else {
      setSeats(Array(rows).fill(null).map(() => Array(cols).fill(false)));
    }
  };

  return (
    <div className="seat-recommendation">
      <h2>Seat Allocation</h2>
      <p>Click on a seat to allocate/unallocate.</p>
      <div className="seat-grid">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((isOccupied, colIndex) => (
              <div
                key={colIndex}
                className={`seat ${isOccupied ? 'occupied' : 'available'}`}
                onClick={() => toggleSeat(rowIndex, colIndex)}
              >
                {rowIndex * cols + colIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={handleProceedToCostSaving}>Proceed to Cost Savings</button>
        <button onClick={handleProceedToEnergy}>Proceed to Power & Water Consumption</button>
        <button onClick={handleRefresh}>Refresh Seat Allocation</button>
      </div>
    </div>
  );
}

export default SeatRecommendation;
