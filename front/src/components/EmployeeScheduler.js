// src/pages/EmployeeScheduler.js
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const EmployeeScheduler = () => {
  const [companyName, setCompanyName] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [totalEmployees, setTotalEmployees] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [schedule, setSchedule] = useState(null);
  const [message, setMessage] = useState('');
  const [employees, setEmployees] = useState([]);

  const handleCompanyRegistration = () => {
    if (!companyName || !totalSeats || !totalEmployees) {
      setMessage('Please fill out all fields for company registration.');
      return;
    }
    setMessage(`Company '${companyName}' registered successfully.`);
  };

  const handleEmployeeRegistration = () => {
    if (!fullName || !email) {
      setMessage('Please fill out all fields for employee registration.');
      return;
    }
    const newEmployee = { fullName, email };
    setEmployees([...employees, newEmployee]);
    setMessage(`Employee '${fullName}' registered successfully.`);
    setFullName('');
    setEmail('');
  };

  const handleScheduleUpdate = () => {
    if (parseInt(totalSeats) >= parseInt(totalEmployees)) {
      setMessage('Not applicable as seats are sufficient.');
      return;
    }

    const onlineEmployees = employees.slice(0, Math.max(0, totalEmployees - totalSeats));
    setSchedule({
      date: new Date().toLocaleDateString(),
      onlineEmployees: onlineEmployees.map(emp => emp.fullName),
    });
    setMessage('Schedule updated successfully.');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Scheduler</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Company Registration</h2>
        <Input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="my-2"
        />
        <Input
          type="number"
          placeholder="Total Seats"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          className="my-2"
        />
        <Input
          type="number"
          placeholder="Total Employees"
          value={totalEmployees}
          onChange={(e) => setTotalEmployees(e.target.value)}
          className="my-2"
        />
        <Button onClick={handleCompanyRegistration} className="my-2">Register Company</Button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Employee Registration</h2>
        <Input
          type="text"
          placeholder="Employee Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="my-2"
        />
        <Input
          type="email"
          placeholder="Employee Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-2"
        />
        <Button onClick={handleEmployeeRegistration} className="my-2">Register Employee</Button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Online Employee Scheduling</h2>
        <Button onClick={handleScheduleUpdate} className="my-2">Show Online Employees for Tomorrow</Button>
        {schedule && (
          <div className="my-2">
            <h3>Schedule for {schedule.date}:</h3>
            <ul>
              {schedule.onlineEmployees.map((employee, index) => (
                <li key={index}>{employee}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {message && <div className="mt-4 text-red-500">{message}</div>}
    </div>
  );
};

export default EmployeeScheduler;
