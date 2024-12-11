import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-auto mt-20 flex flex-col items-center">
      <div className='w-2/5 bg-white p-10 rounded-lg shadow-lg'>
        <>
          <div className='flex items-center gap-4'>
            <CheckCircleIcon className='text-green-500' style={{ fontSize: '3rem' }} />
            <h1 className='text-2xl font-bold'>Your order has been placed!</h1>
          </div>
          <p className='text-gray-500 mt-4'>Thank you for purchase at Madness!</p>
          <button onClick={() => navigate('/')} className='bg-black text-white px-4 py-2 rounded-md mt-4'>Continue Shopping</button>
        </>

      </div>
    </div>
  );
};

export default Success;