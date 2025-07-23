import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkerTable from './WorkerList';
import './CompanyForm.css';

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [onlineWorkers, setOnlineWorkers] = useState([]);
  const [offlineWorkers, setOfflineWorkers] = useState([]);

  const allocateWorkers = (employees, seatsAvailable, reservations) => {
  const offline = [];
  const online = [];
  const reservationSet = new Set(reservations);

  // Step 1: Add reserved employees to offline
  for (const emp of employees) {
    if (reservationSet.has(emp.id)) {
      offline.push(emp);
    }
  }

  // Step 2: Fill extra offline seats from remaining unbooked employees
  for (const emp of employees) {
    if (!reservationSet.has(emp.id) && offline.length < seatsAvailable) {
      offline.push(emp);
    }
  }

  // Step 3: Remaining go online
  for (const emp of employees) {
    if (!offline.includes(emp)) {
      online.push(emp);
    }
  }

  return { offline, online };
};


  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/allocation-data');
      const { companyName, employees, seatsAvailable, reservations } = res.data;

      setCompanyName(companyName);
      setSeatsAvailable(seatsAvailable);
      setEmployees(employees);

      const { offline, online } = allocateWorkers(employees, seatsAvailable, reservations);
      setOfflineWorkers(offline);
      setOnlineWorkers(online);
    } catch (err) {
      alert("Error fetching data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>{companyName} Worker Allocation</h2>
      <p><strong>Total Employees:</strong> {employees.length}</p>
      <p><strong>Available Seats:</strong> {seatsAvailable}</p>

      <WorkerTable onlineWorkers={onlineWorkers} offlineWorkers={offlineWorkers} />
    </div>
  );
};

export default CompanyForm;
