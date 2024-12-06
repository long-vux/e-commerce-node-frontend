import React, { useState, useEffect, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecoverPassword = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  
  const [resetMode, setResetMode] = useState(false)
  const { userId, token } = useParams()

  useEffect(() => {
    if (userId && token) {
      setResetMode(true)
    }
  }, [userId, token])

  const handleSendResetLink = async () => {
    if (!email) {
      toast.error('Email is required')
      return
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/user/password/recover`, { email })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Password is required')
      return
    }
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}api/user/password/reset/${userId}/${token}`, { newPassword })
      navigate('/login')
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="mx-auto mt-20 flex flex-col items-center">
      <div className='w-2/5 bg-white p-10 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <h1 className='text-3xl font-bold'>Recover password</h1>
        </div>
        { resetMode ? (
          <>
            <div className='mb-4'>
              <label className="block mb-2">Enter new password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword || ''}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full p-2 border rounded bg-gray-100`}
              />
            </div>
            <div>
              <label className="block mb-2">Confirm new password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword || ''}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2 border rounded bg-gray-100`}
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block mb-2">Enter your Email</label>
            <input
              type="email"
              name="email"
              value={email || ''}
              required
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border rounded bg-gray-100`}
            />
          </div>
        )}
        <button className="flex items-center my-4 bg-white p-2 border border-gray-300" onClick={!resetMode ? handleSendResetLink : handleResetPassword}>
          <span className="text-lg">{!resetMode ? 'Send reset link' : 'Reset password'}</span>
        </button>
      </div>

    </div>
  );
};

export default RecoverPassword;