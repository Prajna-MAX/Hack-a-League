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

  // Only use reservation list to determine online/offline
  const allocateWorkers = (employees, reservations) => {
    const offline = [];
    const online = [];

    const reservationSet = new Set(reservations);

    for (const emp of employees) {
      if (reservationSet.has(emp.id)) {
        offline.push(emp);
      } else {
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

      const { offline, online } = allocateWorkers(employees, reservations);
      setOfflineWorkers(offline);
      setOnlineWorkers(online);
    } catch (err) {
      alert('Error fetching data.');
      console.error(err);
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
