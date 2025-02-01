import React from 'react'
import './Home.css'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

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
    </div>
    <button 
      className="feature-card" 
      onClick={() => navigate("/departments")}
    >
      <h3>Info on department</h3>
      <p>Reserve a seat at your convenience for the day or week.</p>
    </button>
    <button 
      className="feature-card" 
      onClick={() => navigate("/seats")}
    >
      <h3>Book a Seat</h3>
      <p>Reserve a seat at your convenience for the day or week.</p>
    </button>
  </section>

  
  </div>

  )
}

export default Home