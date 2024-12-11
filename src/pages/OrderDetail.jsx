import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAxios from '../utils/axiosInstance'
import { formatCurrency } from '../utils/formatCurrency'

const OrderDetails = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const axios = useAxios()
  const [order, setOrder] = useState(null)

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/order/get-order-details/${orderId}`)
      setOrder(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div className='md:p-20 pt-8 mx-auto w-5/6'>
      <button
        className='mb-4 p-2 border bg-gray-200 hover:bg-gray-300'
        onClick={() => navigate('/history-purchase')}
      >
        Back to Order History
      </button>
      <h1 className='text-3xl font-bold mb-4'>Order Details</h1>
      <div className='p-6 border border-gray-300'>
        <div className='flex flex-row gap-8'>
          <div className='flex flex-col gap-2 w-3/5'>
            <p><strong>Receiver Name:</strong> {order.receiverName}</p>
            <p><strong>Receiver Email:</strong> {order.receiverEmail}</p>
            <p><strong>Receiver Phone:</strong> {order.receiverPhone}</p>
            <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
          </div>
          <div className='flex justify-between flex-col w-2/5'>
            <h2 className='font-bold'>Order ID: {order._id}</h2>
            <p><strong>Order Total:</strong> {formatCurrency(order.total)}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <h3 className='text-lg font-bold mt-4 mb-2'>Items:</h3>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='border p-2'>Product Image</th>
              <th className='border p-2'>Product Name</th>
              <th className='border p-2'>Price</th>
              <th className='border p-2'>Quantity</th>
              <th className='border p-2'>Total</th>
              <th className='border p-2'>Variant</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className='border text-center'>
                <td className='border p-2'>
                  <img
                    src={item.product.images[0]} // Display the first image
                    alt={item.product.name}
                    className='w-20 h-20 object-cover'
                  />
                </td>
                <td className='border p-2'>{item.product.name}</td>
                <td className='border p-2'>{formatCurrency(item.product.price)}</td>
                <td className='border p-2'>{item.quantity}</td>
                <td className='border p-2'>{formatCurrency(item.price)}</td>
                <td className='border p-2'>{item.variant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderDetails
