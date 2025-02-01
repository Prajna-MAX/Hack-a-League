import React, { useState, useEffect } from 'react';
import WorkerTable from './WorkerList';
import CalendarView from './CalendarView';

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [totalEmployees, setTotalEmployees] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');
  const [onlineWorkers, setOnlineWorkers] = useState([]);
  const [offlineWorkers, setOfflineWorkers] = useState([]);
  const [workHistory, setWorkHistory] = useState(() => {
    const savedHistory = localStorage.getItem('workHistory');
    return savedHistory ? JSON.parse(savedHistory) : {};
  });

  useEffect(() => {
    localStorage.setItem('workHistory', JSON.stringify(workHistory));
  }, [workHistory]);

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

    updateCalendar(online, offline);
  };

  const generateEmployeeIds = (companyPrefix, count) => {
    return Array.from({ length: count }, (_, i) => `${companyPrefix.substring(0, 4).toUpperCase()}-${i + 1}`);
  };

  const updateCalendar = (online, offline) => {
    const today = new Date().toISOString().split('T')[0];
    setWorkHistory((prev) => ({
      ...prev,
      [today]: { online, offline }
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Total Employees:
          <input
            type="number"
            value={totalEmployees}
            onChange={(e) => setTotalEmployees(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Available Seats:
          <input
            type="number"
            value={seatsAvailable}
            onChange={(e) => setSeatsAvailable(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Allocate Workers</button>
      </form>

      <WorkerTable onlineWorkers={onlineWorkers} offlineWorkers={offlineWorkers} />
      <CalendarView workHistory={workHistory} />
    </div>
  );
};

export default CompanyForm;
