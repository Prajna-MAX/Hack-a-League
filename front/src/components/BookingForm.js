import React, { useState, useEffect } from 'react';
import './BookingForm.css'
const BookingForm = ({ selectedSeat, onSubmit }) => {
  // Ensure that preferences are initialized with default values
  const [preferences, setPreferences] = useState({
    purpose: '', // Purpose of booking
    team: '', // Team selection
    userType: 'visitor', // Default to 'visitor' or 'internal'
    zone: '' // Zone preference
  });

  // Handle case when selectedSeat is null or undefined
  if (!selectedSeat) {
    return <p>Loading seat information...</p>; // Optionally, show loading or an error message
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...selectedSeat, preferences });
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      {/* Show seat number if it exists */}
      <h2>Book Seat {selectedSeat.number || 'Not Available'}</h2>

      {/* User Type Radio Buttons */}
      <div className="form-group">
        <label className="form-label">User Type:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="userType"
              value="visitor"
              checked={preferences.userType === 'visitor'}
              onChange={handlePreferenceChange}
            />
            Visitor
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="internal"
              checked={preferences.userType === 'internal'}
              onChange={handlePreferenceChange}
            />
            Internal
          </label>
        </div>
      </div>

      {/* Zone Radio Buttons */}
      <div className="form-group">
        <label className="form-label">Zone:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="zone"
              value="teamArea"
              checked={preferences.zone === 'teamArea'}
              onChange={handlePreferenceChange}
            />
            Team Area
          </label>
          <label>
            <input
              type="radio"
              name="zone"
              value="individualZone"
              checked={preferences.zone === 'individualZone'}
              onChange={handlePreferenceChange}
            />
            Individual Zone
          </label>
          <label>
            <input
              type="radio"
              name="zone"
              value="visitorZone"
              checked={preferences.zone === 'visitorZone'}
              onChange={handlePreferenceChange}
            />
            Visitor Zone
          </label>
        </div>
      </div>

      {/* Purpose Dropdown */}
      <label className="form-label">
        Purpose:
        <select
          name="purpose"
          value={preferences.purpose}
          onChange={handlePreferenceChange}
          className="form-select"
        >
          <option value="">Select purpose</option>
          <option value="collaborate">Collaborate</option>
          <option value="presentation">Presentation</option>
          <option value="teamDiscussion">Team Discussion</option>
        </select>
      </label>

      {/* Team Dropdown */}
      <label className="form-label">
        Sit with Team:
        <select
          name="team"
          value={preferences.team}
          onChange={handlePreferenceChange}
          className="form-select"
        >
          <option value="">Select Team</option>
          <option value="teamA">Team A</option>
          <option value="teamB">Team B</option>
          <option value="teamC">Team C</option>
        </select>
      </label>

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Book Seat
      </button>
    </form>
  );
};

export default BookingForm;
*/