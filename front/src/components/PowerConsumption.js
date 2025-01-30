import React from 'react';
import { useLocation } from 'react-router-dom';

const powerPerSeat = 5;  // Power usage per seat in kWh
const waterPerSeat = 2;  // Water usage per seat in Liters

function PowerConsumption() {
  const location = useLocation();
  const { selectedSeatsCount } = location.state || { selectedSeatsCount: 0 };

  const totalPowerUsage = selectedSeatsCount * powerPerSeat;
  const totalWaterUsage = selectedSeatsCount * waterPerSeat;

  return (
    <div className="power-consumption">
      <h2>Energy & Water Consumption</h2>
      <p><strong>Selected Seats (Occupied):</strong> {selectedSeatsCount}</p>
      <p><strong>Total Power Usage:</strong> {totalPowerUsage} kWh</p>
      <p><strong>Total Chilled Water Usage:</strong> {totalWaterUsage} Liters</p>

      <button onClick={() => alert('Optimizing Power Usage!')}>Optimize Power Usage</button>
      <button onClick={() => alert('Optimizing Water Consumption!')}>Optimize Water Consumption</button>
    </div>
  );
}

export default PowerConsumption;
