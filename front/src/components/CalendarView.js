import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // optional, if using react-datepicker
import "react-datepicker/dist/react-datepicker.css";

const CalendarView = ({ workHistory }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [workerDetails, setWorkerDetails] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    if (workHistory[formattedDate]) {
      const { online, offline } = workHistory[formattedDate];
      setWorkerDetails({ online, offline });
    } else {
      setWorkerDetails(null); // No data for that day
    }
  };

  return (
    <div>
      <h3>Worker Allocation Calendar</h3>
      
      {/* Date Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
      />

      {workerDetails ? (
        <div>
          <h4>Allocation for {selectedDate.toISOString().split('T')[0]}</h4>
          <table border="1">
            <thead>
              <tr>
                <th>Type</th>
                <th>Workers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Online Workers</td>
                <td>{workerDetails.online.join(', ')}</td>
              </tr>
              <tr>
                <td>Offline Workers</td>
                <td>{workerDetails.offline.join(', ')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No allocation data for the selected date.</p>
      )}
    </div>
  );
};

export default CalendarView;
