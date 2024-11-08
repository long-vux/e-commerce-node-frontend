// src/contexts/AppContext.js

import React, { createContext, useState } from 'react';

// Create context
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state for user

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
