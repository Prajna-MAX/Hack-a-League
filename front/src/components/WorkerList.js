import React from 'react';

const WorkerTable = ({ onlineWorkers, offlineWorkers }) => {
  return (
    <div>
      <h3>Worker Allocation for Today</h3>
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
            <td>{onlineWorkers.join(', ')}</td>
          </tr>
          <tr>
            <td>Offline Workers</td>
            <td>{offlineWorkers.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WorkerTable;
