import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Signup = () => {
  const apiUrl = process.env.REACT_APP_API_URL

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  let user = sessionStorage.getItem('user')
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleGoogleLoginSuccess = async (response) => {
    const token = response.credential
    try {
      const response = await axios.post(apiUrl + 'api/auth/googleLogin', { token })
      const newToken = JSON.stringify(response.data.token)
      const decodedToken = jwtDecode(newToken)
      sessionStorage.setItem('user', JSON.stringify(decodedToken))
      toast.success('Login successful')
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Login failed')
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log(error)
    toast.error('Login failed')
  };

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    } else if (!password.match(/\d/)) {
      setError('Password must contain at least 1 digit')
      return
    } else {
      setError('')
    }
    try {
      const response = await axios.post(
        apiUrl + 'api/auth/register',
        { firstName, lastName, email, phoneNumber, password }
      )
      if (response.status === 200) {
        toast.success('Account created successfully, please verify your email')
        navigate(`/login`)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='flex flex-row justify-around gap-20 items-center h-[600px]'>
      <div className='w-3/5 flex flex-col items-center'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col p-4 rounded-lg ml-20 border border-1 border-gray-300 mb-2 w-[70%]'
        >
          <h1 className='text-2xl font-bold mb-4'>Sign up</h1>
          <div className='flex flex-row gap-4'>
            <div className='flex flex-col mb-4 w-1/2'>
              <label className='text-sm font-bold mb-1'>First Name</label>
              <input type="text" value={firstName} required className='border border-1 border-gray-300 rounded-md p-2' onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className='flex flex-col mb-4 w-1/2'>
              <label className='text-sm font-bold mb-1'>Last Name</label>
              <input type="text" value={lastName} required className='border border-1 border-gray-300 rounded-md p-2' onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div className='flex flex-col mb-4'>
            <label className='text-sm font-bold mb-1'>Email</label>
            <input type="email" value={email} required className='border border-1 border-gray-300 rounded-md p-2' onChange={e => setEmail(e.target.value)} />
          </div>

          <div className='flex flex-col mb-4' >
            <label className='text-sm font-bold mb-1'>Phone Number</label>
            <input type="tel" value={phoneNumber} required className='border border-1 border-gray-300 rounded-md p-2' onChange={e => setPhoneNumber(e.target.value)} />
          </div>
          <div className='flex flex-row gap-4'>
            <div className='flex flex-col mb-4 w-1/2'>
              <label className='text-sm font-bold mb-1'>Password</label>
              <input type="password" value={password} required className='border border-1 border-gray-300 rounded-md p-2' onChange={e => setPassword(e.target.value)} />
            </div>
            <div className='flex flex-col mb-4 w-1/2'>
              <label className='text-sm font-bold mb-1'>Confirm Password</label>
              <input type="password" value={confirmPassword} required className='border border-1 border-gray-300 rounded-md p-2' onChange={e => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          {error && (
            <div className='mb-4'>
              <p className='text-red-500'>{error}</p>
            </div>
          )}
          <button className='bg-[#1D4567] text-white p-2 mb-4 rounded-md hover:bg-white hover:text-[#1D4567] hover:outline hover:outline-1 hover:outline-[#1D4567] hover:font-bold'><span className='font-bold'>Sign up</span></button>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
          />
        </form>
        <span className='flex justify-center text-sm gap-2'>Already have an account?  <a href="/login" className='font-bold underline'>Login</a></span>
      </div>
      <div className='w-2/5'>
        <img src={process.env.PUBLIC_URL + '/assets/hotel_facilities/pool.jpg'} alt='room' className='h-[600px] w-full' />
      </div>
    </div>
  )
}
export default Signup