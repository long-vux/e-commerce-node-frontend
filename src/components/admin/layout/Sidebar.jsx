import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Dashboard,
  PeopleOutline,
  KingBed,
  Payment,
  CalendarMonth,
  Logout
} from '@mui/icons-material'
import KitchenIcon from '@mui/icons-material/Kitchen';
import DiscountIcon from '@mui/icons-material/Discount';
import GroupIcon from '@mui/icons-material/Group';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { UserContext } from '../../../contexts/UserContext';

const Sidebar = () => {
  const { logout } = useContext(UserContext);

  const activeStyle = 'bg-[#F5F7F8] border-r-4 border-black  duration-500 ease-in-out'
  const inactiveStyle = 'text-gray-700  duration-500 ease-in-out'
  const handleLogout = () => {
    logout();
  }

  return (
    <div className='sidebar w-full h-full flex flex-col justify-between'>
      <ul className=' h-full m-4 text-[16px] flex flex-col gap-1'>
        <li>
          <NavLink
            exact
            to='/admin/dashboard'
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 hover:bg-[#F5F7F8]  ${
                isActive ? activeStyle : inactiveStyle
              } `
            }
          >
            <Dashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/admin/product'
            className={({ isActive }) =>
              `flex items-center hover:bg-[#F5F7F8]  gap-4 p-2 ${
                isActive ? activeStyle : inactiveStyle
              } `
            }
          >
            <KitchenIcon />
            <span>Product</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/admin/order'
            className={({ isActive }) =>
              `hover:bg-[#F5F7F8] flex items-center gap-4 p-2 ${
                isActive ? activeStyle : inactiveStyle
              } `
            }
          >
            <LocalAtmIcon />
            <span>Order</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/admin/coupon'
            className={({ isActive }) =>
              `hover:bg-[#F5F7F8] flex items-center gap-4 p-2 ${
                isActive ? activeStyle : inactiveStyle
              } `
            }
          >
            <DiscountIcon />
            <span>Coupon</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/admin/user'
            className={({ isActive }) =>
              `hover:bg-[#F5F7F8] flex items-center gap-4 p-2 ${
                isActive ? activeStyle : inactiveStyle
              } `
            }
          >
            <GroupIcon />
            <span>User</span>
          </NavLink>
        </li>

        <li onClick={handleLogout} className='cursor-pointer'>
          <NavLink
            to='/login'
            className='hover:bg-[#F5F7F8] flex items-center gap-4 p-2'
          >
            <Logout />
            <span>Log out</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
