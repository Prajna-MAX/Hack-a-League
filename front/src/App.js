import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import SignIn from './components/signup';
import Login from './components/login';
import Home from './components/Home';
import Seat from './components/Seat';
import Departments from './components/Departments';
import Deptsform from './components/deptForm';
import CompanyForm from './components/CompanyForm';
import OfficeSpaceCalculator from './components/OfficeSpaceCalculator';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/seats"
            element={
              <PrivateRoute>
                <Seat />
              </PrivateRoute>
            }
          />
          <Route
            path="/departments"
            element={
              <PrivateRoute>
                <Departments />
              </PrivateRoute>
            }
          />
          <Route
            path="/deptform/:id"
            element={
              <PrivateRoute>
                <Deptsform />
              </PrivateRoute>
            }
          />
          <Route
            path="/company-form"
            element={
              <PrivateRoute>
                <CompanyForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/office-space-calculator"
            element={
              <PrivateRoute>
                <OfficeSpaceCalculator />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
