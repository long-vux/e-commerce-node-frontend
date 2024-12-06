import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   const userData = JSON.parse(sessionStorage.getItem('user'));
  //   if (!userData) {
  //     console.log('no session');
  //     navigate('/login');
  //   }
  // }, [navigate]);

  // const userData = JSON.parse(sessionStorage.getItem('user'));
  

  // if (!userData) {
  //   return null; // Or a loading indicator while redirecting
  // }else{
  //   console.log(userData);
    
  // }

  

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
