import React from 'react'
import './Home.css'
import { useNavigate } from "react-router-dom";
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

  return (
    <div className='home'>
      <section className="intro">
        <h2>Welcome to the Office Seat Management System</h2>
        <p>Efficiently manage and book office seats for optimal space utilization and comfort.</p>
      </section>

      <section className="features">
        <button 
      className="feature-card" 
      onClick={() => navigate("/company-form")}
    >
      <h3>Go to Work Management</h3>
      
    </button>
        
      <button 
      className="feature-card" 
      onClick={() => navigate("/office-space-calculator")}
    >
      <h3>Welcome to the Office Space Allocation App</h3>
      <p>Click the button below to calculate the office space allocation.</p>
    </button>
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

export default Home;
