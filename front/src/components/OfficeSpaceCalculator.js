import React, { useState } from "react";

const SeatingCapacityCalculator = () => {
  const [officeName, setOfficeName] = useState("");
  const [hallLength, setHallLength] = useState(4);
  const [hallWidth, setHallWidth] = useState("");
  const [tableLength, setTableLength] = useState("");
  const [tableWidth, setTableWidth] = useState("");
  const [spacing, setSpacing] = useState("");
  const [presentEmployees, setPresentEmployees] = useState("");
  const [energyPerSqM, setEnergyPerSqM] = useState("");
  const [addedEmployees, setAddedEmployees] = useState("");

  const [seats, setSeats] = useState([]);
  const [capacitySummary, setCapacitySummary] = useState(null);
  const [energyReport, setEnergyReport] = useState(null);

  const calculate = () => {
    const length = parseFloat(hallLength);
    const width = parseFloat(hallWidth);
    const tLength = parseFloat(tableLength);
    const tWidth = parseFloat(tableWidth);
    const space = parseFloat(spacing);
    const current = parseInt(presentEmployees, 10);
    const energyRate = parseFloat(energyPerSqM);
    const extra = parseInt(addedEmployees, 10);

    if (
      [length, width, tLength, tWidth, space, current, energyRate].some(isNaN)
    ) {
      alert("Please enter all required fields correctly.");
      return;
    }

    const seatLength = tLength + space;
    const seatWidth = tWidth + space;
    const maxRows = Math.floor(length / seatLength);
    const maxCols = Math.floor(width / seatWidth);
    const totalSeats = maxRows * maxCols;

    const seatGrid = Array.from({ length: totalSeats }, (_, i) => ({
      id: i + 1,
      occupied: i < current,
    }));

    setSeats(seatGrid);
    setCapacitySummary({
      total: totalSeats,
      present: current,
      extra: totalSeats - current,
    });

    const hallArea = length * width;
    const totalEnergy = hallArea * energyRate;
    const conservedEnergy = extra * energyRate;

    setEnergyReport({
      totalEnergy,
      conservedEnergy,
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🪑 Seating & Energy Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Office Name"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Hall Length (m)"
            value={hallLength}
            onChange={(e) => setHallLength(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Hall Width (m)"
            value={hallWidth}
            onChange={(e) => setHallWidth(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Table Length (m)"
            value={tableLength}
            onChange={(e) => setTableLength(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Table Width (m)"
            value={tableWidth}
            onChange={(e) => setTableWidth(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Space Between Tables (m)"
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Present Employees"
            value={presentEmployees}
            onChange={(e) => setPresentEmployees(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Added Employees"
            value={addedEmployees}
            onChange={(e) => setAddedEmployees(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Energy per sq.m (watts)"
            value={energyPerSqM}
            onChange={(e) => setEnergyPerSqM(e.target.value)}
            className="input"
          />

          <button
            onClick={calculate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Calculate
          </button>
        </div>

        {/* Seat Summary + Energy Report */}
        <div className="space-y-4">
          {capacitySummary && (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-bold text-lg mb-2">Capacity Summary</h3>
              <p>🏢 Total Seats: {capacitySummary.total}</p>
              <p>👥 Present Employees: {capacitySummary.present}</p>
              <p>🟢 Seats Available: {capacitySummary.extra}</p>
            </div>
          )}

          {energyReport && (
            <div className="bg-green-100 p-4 rounded">
              <h3 className="font-bold text-lg mb-2">Energy Report</h3>
              <p>⚡ Total Energy Consumption: {energyReport.totalEnergy} watts</p>
              <p>🌱 Energy Conserved by Added Employees: {energyReport.conservedEnergy} watts</p>
            </div>
          )}
        </div>
      </div>

      {/* Seat Grid */}
      {seats.length > 0 && (
        <div className="mt-8 grid grid-cols-10 gap-2">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`w-8 h-8 text-center rounded ${
                seat.occupied ? "bg-red-400" : "bg-green-400"
              }`}
            >
              {seat.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeatingCapacityCalculator;
