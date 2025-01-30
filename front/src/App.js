import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';  // Import AuthProvider
import SignIn from './components/signup';
import Login from './components/login';
import Home from './components/Home';
import SeatRecommendation from './components/SeatRecommendation';
import CostSaving from './components/CostSaving';
import PowerConsumption from './components/PowerConsumption';


function App() {
  return (
    <AuthProvider>  {/* Wrap App with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/seat-recommendation" element={<SeatRecommendation />} />
          <Route path="/cost-saving" element={<CostSaving totalSeats={100} usedSeats={60} costPerSeat={1000} />} />
          <Route path="/power-consumption" element={<PowerConsumption />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
