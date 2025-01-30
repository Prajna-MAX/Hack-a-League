import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='home'>
      <section className="intro">
        <h2>Welcome to the Office Seat Management System</h2>
        <p>Efficiently manage and book office seats for optimal space utilization and comfort.</p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Seat Availability</h3>
          <p>View real-time seat availability across multiple offices.</p>
          <Link to="/seat-recommendation">
            <button>Check Seat Availability</button>
          </Link>
        </div>
        <div className="feature-card">
          <h3>Book a Seat</h3>
          <p>Reserve a seat at your convenience for the day or week.</p>
        </div>
        <div className="feature-card">
          <h3>My Bookings</h3>
          <p>Manage and view your seat bookings.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
