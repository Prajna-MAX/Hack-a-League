import React, { createContext, useContext, useState } from 'react';

// Create Auth Context
export const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // 'admin' or 'employee'

  const login = (username, password) => {
    setIsLoggedIn(true);
    setRole(username === 'admin' ? 'admin' : 'employee'); // Simple role check
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
