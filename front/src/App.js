import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';  // Import AuthProvider
import SignIn from './components/signup';
import Login from './components/login';
import Home from './components/Home';
import Seat from './components/Seat';
import Deparments from './components/Departments';
import Deptsform from './components/deptForm'

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} /> 
          <Route path='/seats' element={<Seat/>}/>
          <Route path='/departments' element={<Deparments/>}/>
          <Route path='/deptform/:id' element={<Deptsform/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
