import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  // Load user from sessionStorage on initial render
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Function to handle login
  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    setToken(token);
    sessionStorage.setItem('user', JSON.stringify(decodedToken));
    sessionStorage.setItem('token', token);
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  // Function to update user
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
    // If the token contains user information, you might need to update the token as well.
    // For example, re-encode the token with the updated user data.
    // This depends on how your backend handles token generation.
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};