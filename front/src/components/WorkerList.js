import React from 'react';

const WorkerList = ({ onlineWorkers, offlineWorkers }) => {
  return (
    <div>
      <h3>Worker Allocation for Today</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Workers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Online Workers</td>
            <td>{onlineWorkers.map(emp => emp.fullName).join(', ') || 'None'}</td>
          </tr>
          <tr>
            <td>Offline Workers</td>
            <td>{offlineWorkers.map(emp => emp.fullName).join(', ') || 'None'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WorkerList;
