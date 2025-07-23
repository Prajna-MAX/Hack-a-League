import React from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css'; // Ensure this points to your new CSS file

function Home() {
    const navigate = useNavigate();

    return (
        <div className='home'>
            <section className="intro">
                <h2 className="classic-title">Welcome to the Office Seat Management System</h2>
                <p className="intro-text">Efficiently manage and book office seats for optimal space utilization and comfort.</p>
            </section>

            <section className="features-grid"> {/* Changed class name for better semantic meaning */}
                <button
                    className="feature-card"
                    onClick={() => navigate("/company-form")}
                >
                    <h3>Work Management</h3>
                    <p>Manage company details, employees, and work-from-home policies.</p> {/* Added descriptive text */}
                </button>

                <button
                    className="feature-card"
                    onClick={() => navigate("/office-space-calculator")}
                >
                    <h3>Office Space Allocation</h3>
                    <p>Calculate optimal office space utilization based on current needs.</p> {/* Updated description */}
                </button>

                <button
                    className="feature-card"
                    onClick={() => navigate("/departments")}
                >
                    <h3>Department Information</h3>
                    <p>View details and manage settings for various departments.</p> {/* Updated description */}
                </button>

                <button
                    className="feature-card"
                    onClick={() => navigate("/seats")}
                >
                    <h3>Book a Seat</h3>
                    <p>Secure your workspace by reserving a seat for today or future dates.</p> {/* Updated description */}
                </button>
            </section>
        </div>
    );
}

export default Home;