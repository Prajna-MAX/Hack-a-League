import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import SignIn from './components/signup';
import Login from './components/login';
import Home from './components/Home';
import CompanyForm from './components/CompanyForm'; // Import CompanyForm component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/company-form" element={<CompanyForm />} /> {/* New Route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
