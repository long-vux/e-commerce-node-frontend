import React from 'react';
import logo from '../../assets/images/logo.png';
import { Search, PersonOutlineOutlined, ShoppingCartOutlined } from '@mui/icons-material';

const Header = () => {

  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <img src={logo} alt="Logo" className="w-40 h-20 md:w-48 md:h-24" />
          </a>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-16 text-lg font-bold">
            <li><a href="/" className="hover:text-blue-500">MEN</a></li>
            <li><a href="/" className="hover:text-blue-500">WOMEN</a></li>
            <li><a href="/" className="hover:text-blue-500">KID</a></li>
            <li><a href="/" className="hover:text-blue-500">UNISEX</a></li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="https://www.facebook.com/fb.longvu/" className="text-gray-600 hover:text-blue-500">
            <Search fontSize='large' />
          </a>
          <a href="https://www.facebook.com/fb.longvu/" className="text-gray-600 hover:text-blue-500">
            <PersonOutlineOutlined fontSize='large' />
          </a>
          <a href="https://www.facebook.com/fb.longvu/" className="text-gray-600 hover:text-blue-500">
            <ShoppingCartOutlined fontSize='large' />
          </a>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="hidden md:flex justify-center bg-black text-white py-2">
        <ul className="flex gap-12 italic">
          <li><a href="/" className="hover:text-blue-400">Thrift Finds</a></li>
          <li><a href="/" className="hover:text-blue-400">SecondHand Chic</a></li>
          <li><a href="/" className="hover:text-blue-400">Y2k</a></li>
          <li><a href="/" className="hover:text-blue-400">Nike</a></li>
          <li><a href="/" className="hover:text-blue-400">Puma</a></li>
          <li><a href="/" className="hover:text-blue-400">Bargain Bonanza</a></li>
          <li><a href="/" className="hover:text-blue-400">Balenciaga</a></li>
          <li><a href="/" className="hover:text-blue-400">Adidas</a></li>
          <li><a href="/" className="hover:text-blue-400">Gucci</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;