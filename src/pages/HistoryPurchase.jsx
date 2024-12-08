import React, { useState, useEffect, useContext } from 'react'
import {
  Person2Outlined,
  LogoutOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import useAxios from '../utils/axiosInstance'
import { UserContext } from '../contexts/UserContext'

const HistoryPurchase = () => {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()
  const axios = useAxios()

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/order/get-orders-of-user')
      setOrders(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const viewOrderDetails = (orderId) => {
    navigate(`/order-details/${orderId}`)
  }

  return (
    <div className='md:p-20 pt-8 mx-auto w-5/6'>
      <h1 className='text-3xl font-bold mb-4'>My Purchase</h1>
      <div className='flex md:flex-row flex-col'>
        <div className='md:w-1/5 w-full mr-4'>
          <button
            className='flex items-center mb-4 p-4 border w-full hover:bg-black hover:text-white transition-all duration-300 '
            onClick={() => navigate('/profile')}
          >
            <Person2Outlined sx={{ fontSize: 30, marginRight: 1 }} />
            <span className='text-xl'>My Profile</span>
          </button>
          <button
            className='flex items-center mb-4 p-4 border w-full bg-black text-white'
            onClick={() => navigate('/history-purchase')}
          >
            <ShoppingBagOutlined sx={{ fontSize: 30, marginRight: 1 }} />
            <span className='text-xl'>My Purchase</span>
          </button>
          {user && (
            <button
              className='flex items-center mb-4 bg-white p-4 border w-full hover:bg-black hover:text-white transition-all duration-300'
              onClick={handleLogout}
            >
              <LogoutOutlined sx={{ fontSize: 30, marginRight: 1 }} />
              <span className='text-xl'>Log out</span>
            </button>
          )}
        </div>

        {/* Purchase Section */}
        <div className='md:w-5/6 w-full'>
          <div className='p-6 border border-gray-300'>
            <h2 className='text-xl font-bold mb-4'>Order History</h2>
            {orders.length > 0 ? (
              <table className='w-full border-collapse'>
                <thead>
                  <tr>
                    <th className='border p-2'>Product Image</th>
                    <th className='border p-2'>Product Name</th>
                    <th className='border p-2'>Price x Quantity</th>
                    <th className='border p-2'>Order Total</th>
                    <th className='border p-2'>Shipping Address</th>
                    <th className='border p-2'>Status</th>
                    <th className='border p-2'>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} className='border' onClick={() => viewOrderDetails(order._id)} style={{ cursor: 'pointer' }}>
                      <td className='border p-2'>
                        <img
                          src={order.items[0].product.image}
                          alt={order.items[0].product.name}
                          className='w-20 h-20 object-cover'
                        />
                      </td>
                      <td className='border p-2'>
                        {order.items[0].product.name}
                      </td>
                      <td className='border p-2'>
                        ${order.items[0].product.price} x {order.items[0].quantity}
                      </td>
                      <td className='border p-2'>${order.total}</td>
                      <td className='border p-2'>{order.shippingAddress}</td>
                      <td className='border p-2'>{order.status}</td>
                      <td className='border p-2'>
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPurchase
