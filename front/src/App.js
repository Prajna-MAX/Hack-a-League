import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';  // Import AuthProvider
import SignIn from './components/signup';
import Login from './components/login';
import Home from './components/Home';

function App() {
  return (
    <AuthProvider>  {/* Wrap App with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
