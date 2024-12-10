import React, { useEffect } from 'react'
import logo from '../../../assets/images/logo.png'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("No user logged in"); // Example logging
      // You can also redirect if needed, e.g., navigate('/login')
    } else {
      console.log("User is logged in", user); // Example user info logging
    }
  }, [user]);

  return (
    <div className='w-full m-0 h-[60px] text-black flex justify-between items-center pl-[30px] pr-[6px]'>
      <img src={logo} alt='logo' className='cursor-pointer' onClick={() => navigate('/')} />
      <div className='w-[470px] h-[50px] bg-[#F8FAFC] flex items-center justify-center gap-[20px] rounded-l-full rounded-r-3xl ' >
        <input
          type='text'
          placeholder='Search'
          className='w-[300px] h-[36px] rounded-3xl px-4 mr-2 bg-[#E2E8F0]'
        />
        <img alt='room' className='w-[40px] h-[40px] rounded-full cursor-pointer' src={user?.image || ''} onClick={() => navigate('/profile')} />
        <div className='flex flex-col'>
          <h1 className='text-[16px] font-bold cursor-pointer' onClick={() => navigate('/profile')}>{user.firstName + ' ' + user.lastName}</h1>
          <p className='text-[12px] font-medium' onClick={() => navigate('/profile')}>{user.role}</p>
        </div>
      </div>
    </div>
  )
}

export default Header
