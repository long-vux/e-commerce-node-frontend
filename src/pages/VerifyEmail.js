import React, { useState, useEffect }  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VerifyEmail = () => {
  const [validUrl, setValidUrl] = useState(false)
  const { userId, token } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}api/auth/${userId}/verify/${token}`)
        setValidUrl(true) 
      } catch (error) {
        setValidUrl(false)
      }
    }
    verifyEmail()
  }, [userId, token])

  return (
    <div className="mx-auto mt-20 flex flex-col items-center">
      <div className='w-2/5 bg-white p-10 rounded-lg shadow-lg'>
        {validUrl ? (
          <>
            <div className='flex items-center gap-4'>
              <CheckCircleIcon className='text-green-500' style={{ fontSize: '3rem' }} />
              <h1 className='text-2xl font-bold'>Your email has been verified successfully!</h1>
            </div>
            <p className='text-gray-500 mt-4'>You can now login to your account.</p>
            <button onClick={() => navigate('/login')} className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'>Login</button>
          </>
        ) : (
          <h1 className='text-2xl font-bold'>404 Not Found</h1>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;