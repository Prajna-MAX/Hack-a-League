import React from 'react';

function AllocationResult({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div>
        <h2>{result.message}</h2>
        <div>
             <h3>Users</h3>
            <ul>
            {result.users.map(user => (
                <li key = {user._id}>
                   Team: {user.team}, User Type: {user.userType}, Purpose: {user.purpose}
                </li>
            ))}
          </ul>
        </div>
        <div>
             <h3>Seats</h3>
            <ul>
            {result.seats.map(seat => (
                <li key = {seat._id}>
                   Seat Number: {seat.seatNumber}
                </li>
            ))}
          </ul>
        </div>
         <div>
             <h3>Bookings</h3>
            <ul>
            {result.bookings.map(booking => (
                <li key = {booking._id}>
                   User ID: {booking.userId}, Seat ID: {booking.seatId} , booking Time: {booking.bookingTime}
                </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default AllocationResult;