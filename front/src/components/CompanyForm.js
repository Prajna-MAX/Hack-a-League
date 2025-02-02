import React, { useState } from 'react';
import WorkerTable from './WorkerList';
import './CompanyForm.css';

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [totalEmployees, setTotalEmployees] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');
  const [onlineWorkers, setOnlineWorkers] = useState([]);
  const [offlineWorkers, setOfflineWorkers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalEmp = parseInt(totalEmployees);
    const availableSeats = parseInt(seatsAvailable);

    if (totalEmp <= availableSeats) {
      alert(`No need for online allocation, all ${totalEmp} employees can work offline.`);
      setOnlineWorkers([]);
      setOfflineWorkers(generateEmployeeIds(companyName, totalEmp));
      return;
    }

    const onlineCount = totalEmp - availableSeats;
    const allEmployeeIds = generateEmployeeIds(companyName, totalEmp);
    const online = allEmployeeIds.slice(0, onlineCount);
    const offline = allEmployeeIds.slice(onlineCount);

    setOnlineWorkers(online);
    setOfflineWorkers(offline);
  };

  const generateEmployeeIds = (companyPrefix, count) => {
    return Array.from({ length: count }, (_, i) => `${companyPrefix.substring(0, 4).toUpperCase()}-${i + 1}`);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Company Worker Allocation</h2>
        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
        <label>
          Total Employees:
          <input
            type="number"
            value={totalEmployees}
            onChange={(e) => setTotalEmployees(e.target.value)}
            required
          />
        </label>
        <label>
          Available Seats:
          <input
            type="number"
            value={seatsAvailable}
            onChange={(e) => setSeatsAvailable(e.target.value)}
            required
          />
        </label>
        <button type="submit">Allocate Workers</button>
      </form>
      <WorkerTable onlineWorkers={onlineWorkers} offlineWorkers={offlineWorkers} />
    </div>
  );
};

export default CompanyForm;
