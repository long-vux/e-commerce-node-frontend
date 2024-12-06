import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../contexts/UserContext';

const ChangePassword = () => {
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const { user } = useContext(UserContext)
  const axios = useAxios()

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error('Password is required')
      return
    }
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}api/user/password/change`, { oldPassword, newPassword })
      toast.success(response.data.message)
      navigate('/profile')
    } catch (error) {
      toast.error(error.response.data.message)
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
        <button className="flex items-center my-4 bg-white p-2 border border-gray-300" onClick={handleChangePassword}>
          <span className="text-lg">Change password</span>
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;