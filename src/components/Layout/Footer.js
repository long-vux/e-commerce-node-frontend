import React from 'react'
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import poster from '../../assets/images/poster-footer.png';

const Footer = () => {
  return (
    <div className="p-4 md:p-16">
      <div className="w-full h-[2px] bg-gray-300 my-10 md:my-20"></div>
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-8 md:space-y-0 md:space-x-6">
        {/* Contact Us */}
        <div className="w-full md:w-1/4">
          <h1 className="font-bold text-xl md:text-2xl italic pb-3">CONTACT US</h1>
          <p><span className="font-bold">Email:</span> <br />
            hoanglongvu233@gmail.com</p>
          <p><span className="font-bold">Phone:</span> <br />
            +84 961 283 692</p>
          <p><span className="font-bold">Address:</span> <br />
            19 Tan Phong Ward, District 7, Ho Chi Minh City</p>
        </div>
        
        {/* Divider */}
        <div className="hidden md:block w-[2px] h-[150px] bg-gray-300"></div>

        {/* Information */}
        <div className="w-full md:w-1/4">
          <h1 className="font-bold text-xl md:text-2xl italic pb-3">INFORMATION</h1>
          <ul className="space-y-2">
            <li className="hover:text-blue-500 cursor-pointer">About Us</li>
            <li className="hover:text-blue-500 cursor-pointer">F.A.Q.</li>
            <li className="hover:text-blue-500 cursor-pointer">Return Your Order</li>
            <li className="hover:text-blue-500 cursor-pointer">Shipping</li>
            <li className="hover:text-blue-500 cursor-pointer">Sizing</li>
            <li className="hover:text-blue-500 cursor-pointer">Return Policy</li>
          </ul>
        </div>
        
        {/* Divider */}
        <div className="hidden md:block w-[2px] h-[150px] bg-gray-300"></div>

        {/* Connect With Us */}
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          <h1 className="font-bold text-xl md:text-2xl italic">CONNECT WITH US</h1>
          <div className="flex flex-row gap-6">
            <a href="https://www.facebook.com/" aria-label="Facebook"><Facebook color="primary" /></a>
            <a href="https://www.instagram.com/" aria-label="Instagram"><Instagram color="primary" /></a>
            <a href="https://twitter.com/" aria-label="Twitter"><Twitter color="primary" /></a>
            <a href="https://www.youtube.com/" aria-label="YouTube"><YouTube color="secondary" /></a>
          </div>
          <input 
            type="text" 
            placeholder="Your Phone Number" 
            className="w-full p-2 border border-gray-400 rounded" 
          />
          <button className="bg-black text-white p-2 rounded italic hover:bg-gray-800 transition-colors">
            Sign Up
          </button>
        </div>

        {/* Poster Image */}
        <div className="w-full md:w-1/4 mt-8 md:mt-0 flex justify-center">
          <img src={poster} alt="Poster" className="w-full h-auto max-w-[200px] md:max-w-[300px]"/>
        </div>
      </div>
    </div>
  )
}

export default Footer