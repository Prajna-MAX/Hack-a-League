import React, { useState } from "react";
import "./SeatingCapacity.css"; // Ensure to create a CSS file for styling

const SeatingCapacityCalculator = () => {
  // Seating Capacity States
  const [officeName, setOfficeName] = useState("");
  const [hallLength, setHallLength] = useState(4); // Default value as 4
  const [hallWidth, setHallWidth] = useState("");
  const [empLength, setEmpLength] = useState("");
  const [empWidth, setEmpWidth] = useState("");
  const [presentEmployees, setPresentEmployees] = useState("");
  const [spacing, setSpacing] = useState("");
  const [seats, setSeats] = useState([]);
  const [capacitySummary, setCapacitySummary] = useState(null);

  // Energy-related States (Row 1 - energy consumed by hall dimensions)
  const [energyPerSquareMeter, setEnergyPerSquareMeter] = useState(""); // Energy consumed per square meter for hall dimensions
  const [totalEnergy, setTotalEnergy] = useState(null); // Total energy consumed

  // Energy-related States (Row 2 - energy conserved by added employees)
  const [addedEmployees, setAddedEmployees] = useState(""); // Number of added employees
  const [energyConserved, setEnergyConserved] = useState(null); // Energy conserved by added employees

  const calculateCapacity = () => {
    const length = parseFloat(hallLength);
    const width = parseFloat(hallWidth);
    const empLen = parseFloat(empLength);
    const empWid = parseFloat(empWidth);
    const presentEmp = parseInt(presentEmployees, 10);
    const spaceBetween = parseFloat(spacing);

    if (isNaN(length) || isNaN(width) || isNaN(empLen) || isNaN(empWid) || isNaN(presentEmp) || isNaN(spaceBetween)) {
      alert("Please enter valid numeric values.");
      return;
    }

    const totalEmpLength = empLen + spaceBetween;
    const totalEmpWidth = empWid + spaceBetween;

    const maxSeatsLengthwise = Math.floor(length / totalEmpLength);
    const maxSeatsWidthwise = Math.floor(width / totalEmpWidth);

    const maxSeats = maxSeatsLengthwise * maxSeatsWidthwise;
    let newSeats = [];

    for (let i = 1; i <= maxSeats; i++) {
      newSeats.push({ id: i, occupied: i <= presentEmp });
    }

    setSeats(newSeats);
    const extraSeats = maxSeats - presentEmp;
    setCapacitySummary({ presentEmp, extraSeats, totalCapacity: maxSeats });
  };

  const calculateEnergyConsumption = () => {
    const hallLengthVal = parseFloat(hallLength);
    const hallWidthVal = parseFloat(hallWidth);
    const energySquareMeter = parseFloat(energyPerSquareMeter);

    if (isNaN(hallLengthVal) || isNaN(hallWidthVal) || isNaN(energySquareMeter)) {
      alert("Please enter valid values for hall dimensions and energy per square meter.");
      return;
    }

    // Calculate total energy consumed based on hall dimensions
    const hallArea = hallLengthVal * hallWidthVal; // Area of the hall in square meters
    const energyConsumed = hallArea * energySquareMeter; // Total energy consumed by the hall

    setTotalEnergy(energyConsumed);
  };

  const calculateEnergyConserved = () => {
    const addedEmp = parseInt(addedEmployees, 10);
    const energySquareMeter = parseFloat(energyPerSquareMeter);

    if (isNaN(addedEmp) || isNaN(energySquareMeter)) {
      alert("Please enter valid values for added employees and energy per square meter.");
      return;
    }

    // Calculate energy conserved by the added employees
    const energyConservedValue = addedEmp * energySquareMeter;
    setEnergyConserved(energyConservedValue);
  };

  return (
    <div>
      <h2>Seating Capacity and Energy Consumption Calculator</h2>

      {/* Container for Seating Capacity and Energy Sections */}
      <div className="container">
        {/* Seating Capacity Section */}
        <div className="input-group">
          <h3>Seating Capacity</h3>
          <input
            type="text"
            placeholder="Office Name"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Hall Length (m)"
            value={hallLength}
            onChange={(e) => setHallLength(e.target.value)}
          />
          <input
            type="number"
            placeholder="Hall Width (m)"
            value={hallWidth}
            onChange={(e) => setHallWidth(e.target.value)}
          />
          <input
            type="number"
            placeholder="Table Length (m)"
            value={empLength}
            onChange={(e) => setEmpLength(e.target.value)}
          />
          <input
            type="number"
            placeholder="Table Width (m)"
            value={empWidth}
            onChange={(e) => setEmpWidth(e.target.value)}
          />
          <input
            type="number"
            placeholder="Present Number of Employees"
            value={presentEmployees}
            onChange={(e) => setPresentEmployees(e.target.value)}
          />
          <input
            type="number"
            placeholder="Space Between Employees (m)"
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
          />
          <button onClick={calculateCapacity}>Calculate Capacity</button>
        </div>

        {/* Energy Consumption Section */}
        <div className="input-group">
          <h3>Energy Consumption</h3>
          <input
            type="number"
            placeholder="Energy Consumed per Square Meter(watts)"
            value={energyPerSquareMeter}
            onChange={(e) => setEnergyPerSquareMeter(e.target.value)}
          />
          <button onClick={calculateEnergyConsumption}>Calculate Energy Consumed</button>

          {totalEnergy !== null && (
            <div className="energy-summary">
              <h3>Energy Consumption Summary (Hall Dimensions):</h3>
              <p>Total Energy Consumed by Hall: {totalEnergy} watts</p>
            </div>
          )}

          <input
            type="number"
            placeholder="Number of Added Employees"
            value={addedEmployees}
            onChange={(e) => setAddedEmployees(e.target.value)}
          />
          <button onClick={calculateEnergyConserved}>Calculate Energy Conserved</button>

          {energyConserved !== null && (
            <div className="energy-summary">
              <h3>Energy Conservation Summary (Added Employees):</h3>
              <p>Energy Conserved after Adding Employees is greater than: {energyConserved} watts</p>
            </div>
          )}
        </div>
      </div>

      {/* Seating Grid Display */}
      <div className="seating-grid">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={seat.occupied ? "seat occupied" : "seat available"}
          >
            {seat.id}
          </div>
        ))}
      </div>

      {/* Seating Capacity Summary */}
      {capacitySummary && (
        <div className="summary">
          <h3>Summary:</h3>
          <p>📌 Present Employees: {capacitySummary.presentEmp}</p>
          <p>🟢 Extra Employees That Can Be Accommodated: {capacitySummary.extraSeats}</p>
          <p>🏢 Total Capacity of Hall: {capacitySummary.totalCapacity}</p>
        </div>
      )}
    </div>
  );
};

export default SeatingCapacityCalculator;
