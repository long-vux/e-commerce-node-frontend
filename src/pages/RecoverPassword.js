import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const ChangePassword = () => {
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [error, setError] = useState('')

  const handleChangePassword = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}api/user/password/change`, { email: user.email, oldPassword, newPassword })
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <div className="mx-auto mt-20 flex flex-col items-center">
      <div className='w-2/5 bg-white p-10 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <h1 className='text-3xl font-bold'>Change password for {user.firstName}</h1>
        </div>
        <div className='mb-4'>
          <label className="block mb-2">Enter old password</label>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword || ''}
            onChange={(e) => setOldPassword(e.target.value)}
            className={`w-full p-2 border rounded bg-gray-100`}
          />
        </div>
        <div>
          <label className="block mb-2">Enter new password</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword || ''}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full p-2 border rounded bg-gray-100`}
          />
        </div>
        <h1 className='text-2xl font-bold'>{error}</h1>
        <button className="flex items-center my-4 bg-white p-2 border border-gray-300" onClick={handleChangePassword}>
          <span className="text-lg">Change password</span>
        </button>
        <button className="flex items-center my-4 bg-white p-2 border border-gray-300" onClick={() => navigate('/profile')}>
          <span className="text-lg">Back to profile</span>
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;