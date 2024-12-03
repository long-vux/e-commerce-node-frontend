import React, { useState, useEffect, useContext } from 'react'
import useAxios from '../utils/axiosInstance' // require('axios')
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../contexts/UserContext';

import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import madnessLogo from '../assets/utilities/madnessLogo.png'

const LoginSignup = () => {
  const { user, login, logout } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const axios = useAxios()

  // SIGN IN
  const [signUpMode, setSignUpMode] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleGoogleLoginSuccess = async response => {
    const token = response.credential
    try {
      const response = await axios.post(apiUrl + 'api/auth/googleLogin', {
        token
      })
      const newToken = JSON.stringify(response.data.token)
      login(newToken)
      toast.success('Login successful')
      navigate('/')
    } catch (error) {
      console.log('error', error)
      toast.error('Login failed')
    }
  }

  const handleGoogleLoginFailure = error => {
    console.log(error)
    toast.error('Login failed')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(apiUrl + 'api/auth/login', {
        email,
        password
      })

      if (response.status === 200) {
        const newToken = JSON.stringify(response.data.token)
        login(newToken)
        setTimeout(() => {
          logout();
          toast.info('Session expired. Please log in again.')
          navigate('/login') // Redirect to login page after session expires
        }, 24 * 60 * 60 * 1000) // 20 seconds in milliseconds
        navigate('/')
        toast.success('Login successful')
      }
    } catch (error) {
      console.log('error', error)
      if (error.response?.status === 403) {
        setError(error.response.data?.message)
      } else if (error.response?.status === 401) {
        setError(error.response.data?.message)
      } else {
        setError(
          error.response?.data?.errors?.Email[0] ||
            error.response?.data?.errors?.Password[0]
        )
      }
    }
  }

  // SIGN UP

  const [email_register, setEmail_register] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password_register, setPassword_register] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error_register, setError_register] = useState('')

  const handleSubmit_register = async e => {
    e.preventDefault()
    if (password_register !== confirmPassword) {
      setError_register('Passwords do not match')
      return
    } else if (password_register.length < 8) {
      setError_register('Password must be at least 8 characters long')
      return
    } else if (!password_register.match(/\d/)) {
      setError_register('Password must contain at least 1 digit')
      return
    } else {
      setError_register('')
    }
    try {
      const response = await axios.post(apiUrl + 'api/auth/register', {
        firstName,
        lastName,
        email : email_register,
        phoneNumber,
        password : password_register
      })
      if (response.status === 200) {
        toast.success('Account created successfully, please verify your email')
        navigate(`/login`)
      }
    } catch (error) {
      console.log(error);
      
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
      <div className='forms-container'>
        <div className='signin-signup'>
          {/* Sign In Form */}
          <form className='sign-in-form'>
            <h2 className='title font-semibold'>Sign in</h2>
            <div className='input-field'>
              <i className='fas fa-envelope'></i>

              {/* Email sign in */}
              <input
                type='email'
                placeholder='Email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <i className='fas fa-lock'></i>
              <input
                type='password'
                placeholder='Password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className=' mb-4'>
                <p className='text-red-500'>{error}</p>
              </div>
            )}

            <input  type='submit' value='Login' onClick={handleSubmit} className='btn mt-4 solid' />
            {/* GOOGLE LOGIN */}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </form>

          {/* Sign Up Form */}
          <form className='sign-up-form'>
            <h2 className='title font-semibold'>Sign up</h2>

            <div className='input-field'>
              <i className='fas fa-user'></i>
              <input
                type='text'
                placeholder='First name'
                value={firstName}
                required
                onChange={e => setFirstName(e.target.value)}
              />
            </div>

            <div className='input-field'>
              <i className='fas fa-user'></i>
              <input
                type='text'
                placeholder='Last name'
                value={lastName}
                required
                onChange={e => setLastName(e.target.value)}
              />
            </div>

            <div className='input-field'>
              <i className='fas fa-envelope'></i>
              <input
                type='email'
                placeholder='Email'
                value={email_register}
                required
                onChange={e => setEmail_register(e.target.value)}
              />
            </div>

            <div className='input-field'>
              <i className='fas fa-phone'></i>
              <input
                type='tel'
                placeholder='Phone number'
                value={phoneNumber}
                required
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className='input-field'>
              <i className='fas fa-lock'></i>
              <input
                type='password'
                placeholder='Password'
                value={password_register}
                required
                onChange={e => setPassword_register(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <i className='fas fa-lock'></i>
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                required
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            {error_register && (
              <div className='mb-4'>
                <p className='text-red-500'>{error_register}</p>
              </div>
            )}

            <input type='submit' onClick={handleSubmit_register} className='btn' value='Sign up' />
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
            />
          </form>
        </div>
      </div>

      {/* Panels */}
      <div className='panels-container'>
        <div className='panel left-panel'>
          <img src={madnessLogo} className='image' alt='Sign In' />

          <div className='content flex flex-col gap-5'>
            <h3>New here?</h3>

            <button
              className='btn transparent '
              onClick={() => setSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className='panel right-panel'>
          <img src={madnessLogo} className='image' alt='Sign Up' />

          <div className='content flex flex-col gap-5'>
            <h3>One of us?</h3>

            <button
              className='btn transparent'
              onClick={() => setSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
