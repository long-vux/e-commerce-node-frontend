import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user from sessionStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setUser(decodedToken);
    }
  }, []);

  // Function to handle login
  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    setToken(token);
    localStorage.setItem('token', token);
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Function to update user
  const updateUser = async (formData) => {
    const cleanToken = token?.replace(/^"|"$/g, '');

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}api/user/updateProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${cleanToken}`,
        },
      });
      const decodedToken = jwtDecode(response.data.data);
      setToken(response.data.data);
      setUser(decodedToken);
      localStorage.setItem('token', response.data.data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};