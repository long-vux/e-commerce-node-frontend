import React, { useEffect, useContext } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      console.log('no session');
      navigate('/login');
    }
  }, [navigate, user]);

  if (!user) {
    return null; // Or a loading indicator while redirecting
  }else{
    console.log(user);
  }

  return (
    <div
      className='w-full min-h-screen bg-[#F1F1F1] grid grid-cols-layout gap-2 font-inter'
      style={{ gridTemplateRows: 'auto 1fr auto' }}
    >
      <header className='bg-white rounded-md m-2 mb-0 col-span-2'>
        <Header userData={user} />
      </header>
      <aside className='bg-white rounded-md ml-2 row-start-2 col-start-1 col-end-2'>
        <Sidebar userData={user}  />
      </aside>
      <main className='rounded-md mr-2 row-start-2 col-start-2 col-end-3'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
