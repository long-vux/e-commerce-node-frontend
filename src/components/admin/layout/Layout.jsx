import React, { useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { UserContext } from '../../../contexts/UserContext'; // Adjust the path

const Layout = ({ children }) => {
  const { user } = useContext(UserContext); // Accessing user from context

  useEffect(() => {
    if (!user) {
      console.log("No user logged in"); // Example logging
      // You can also redirect if needed, e.g., navigate('/login')
    } else {
      console.log("User is logged in", user); // Example user info logging
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-gray-100 grid grid-cols-[200px_1fr] overflow-x-hidden  font-inter" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <header className="bg-white rounded-md m-2 mb-0 col-span-2">
        <Header />
      </header>

      <aside className="bg-white rounded-md m-2 w-full">
        <Sidebar />
      </aside>

      <main className="rounded-md m-2 px-2 w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
