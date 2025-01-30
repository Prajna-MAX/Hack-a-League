import React from 'react';
import { useLocation } from 'react-router-dom';

const costPerSeat = 1000;  // Example cost per seat for real estate savings

function CostSaving() {
  const location = useLocation();
  const { selectedSeatsCount } = location.state || { selectedSeatsCount: 0 };
  const totalSeats = 25;  // Example total seats (5x5 grid)
  const unusedSeats = totalSeats - selectedSeatsCount;
  const potentialSaving = unusedSeats * costPerSeat;

  return (
    <div className="cost-saving">
      <h2>Real Estate Cost Optimization</h2>
      <p><strong>Total Seats:</strong> {totalSeats}</p>
      <p><strong>Selected Seats (Occupied):</strong> {selectedSeatsCount}</p>
      <p><strong>Unused Seats:</strong> {unusedSeats}</p>
      <p><strong>Potential Savings:</strong> ${potentialSaving.toLocaleString()}</p>
    </div>
  );
}

export default CostSaving;
