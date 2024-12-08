import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct hook for navigation in React Router v6+
import error_404 from '../assets/utilities/error_404.mp4';

const ErrorPage = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleRedirect = () => {
    navigate("/"); // Navigate to the home page or any desired route
  };

  return (
    <div className='w-full h-full flex justify-center items-center '>
      <div className='w-[400px] h-[400px] flex flex-col justify-center items-center gap-6'>
        <video
          src={error_404}
          autoPlay
          loop
          muted
          className='object-cover w-full h-full'
        >
          <p>Your browser does not support the video tag.</p>
        </video>

        <h1 className='text-center text-4xl font-semibold '>WE'RE SORRY</h1>
        <p className='text-center text-lg '>
          The page you're trying to access was not found.
        </p>

        <button
          onClick={handleRedirect}
          className='px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-white hover:text-black border transition-all duration-300'
        >
          GET ME BACK
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
