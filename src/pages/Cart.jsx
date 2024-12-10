import React, { useState, useEffect, useContext } from 'react'
import {
  ShoppingCartOutlined,
  DeleteOutlineOutlined
} from '@mui/icons-material'
import Checkbox from '@mui/material/Checkbox'
import emptyCart2 from '../assets/utilities/emptyCart.png'
import useAxios from '../utils/axiosInstance'
import { UserContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

const Cart = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const { user } = useContext(UserContext)
  const axios = useAxios()
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])
  const [finalTotal, setFinalTotal] = useState(0)

  useEffect(() => {
    fetchCartItems()
  }, [axios, apiUrl, user])

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/cart/get-cart`, {
        withCredentials: true
      })
      const cartItems = response.data.cart.items
      const total = cartItems.reduce(
        (total, item) => (item.selected ? total + item.price : total),
        0
      )
      setFinalTotal(total)
      setCartItems(cartItems)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = (id, variant) => {
    axios
      .delete(`${apiUrl}api/cart/remove-item`, {
        data: {
          productId: id,
          variant: variant
        },
        withCredentials: true
      })
      .then(() => {
        fetchCartItems()
        toast.success('Item removed from cart')
      })
      .catch(err => {
        console.error(err)
        toast.error('Failed to remove item from cart')
      })
  }

  const handleQuantityChange = (id, variant, newQuantity) => {
    axios
      .put(
        `${apiUrl}api/cart/update-item`,
        {
          productId: id,
          variant: variant,
          quantity: newQuantity
        },
        { withCredentials: true }
      )
      .then(() => {
        fetchCartItems()
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleSelect = (id, variant, selected) => {
    axios
      .put(
        `${apiUrl}api/cart/update-selected-item`,
        {
          productId: id,
          variant: variant,
          selected: !selected
        },
        { withCredentials: true }
      )
      .then(() => {
        fetchCartItems()
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected)
    const updatePromises = cartItems.map(item =>
      axios.put(
        `${apiUrl}api/cart/update-selected-item`,
        { productId: item._id, variant: item.variant, selected: !allSelected },
        { withCredentials: true }
      )
    )

    Promise.all(updatePromises)
      .then(() => {
        fetchCartItems()
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div className='p-10 border w-full h-full'>
      <h1 className='text-[30px] font-semibold mb-5'>
        SHOPPING CART <ShoppingCartOutlined />
      </h1>

      {cartItems.length === 0 ? (
        <div className='w-full h-[26rem] flex gap-10 justify-center items-center'>
          <div className='flex flex-col justify-center item-center'>
            <h1 className='md:text-[30px] text-[20px] font-semibold'>
              It looks like your cart is empty.
            </h1>
            <a
              href='./'
              className='text-[20px] center font-semibold p-3 border bg-black text-white hover:bg-white hover:text-black w-fit'
            >
              Start SHOPPING now!
            </a>
          </div>
          <div className='w-[20rem]'>
            <img src={emptyCart2} alt='Empty Cart' className='w-full h-full object-fit' />
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          <table className='border'>
            <thead>
              <tr className='border font-semibold'>
                <td className='p-3' onClick={() => handleSelectAll()}>
                  <Checkbox
                    checked={cartItems.every(item => item.selected)}
                    color='default'
                  />
                  Products
                </td>
                <td>Unit Price</td>
                <td>Variations</td>
                <td>Quantity</td>
                <td>Total Price</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className='border'>
                  <td className='p-3 flex gap-1'>
                    <div className='h-[140px] flex justify-center items-center'>
                      <Checkbox
                        checked={item.selected || false}
                        color='default'
                        onChange={() =>
                          handleSelect(item._id, item.variant, item.selected)
                        }
                      />
                    </div>
                    <div className='w-[140px] h-[140px] border'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='object-cover w-full h-full'
                      />
                    </div>
                    <div
                      className='ml-3 flex items-center cursor-pointer'
                      onClick={() => navigate(`/product/${item.product._id}`)}
                    >
                      <p className='text-[18px] font-bold'>{item.name}</p>
                    </div>
                  </td>
                  <td>{formatCurrency(item.originalPrice)}</td>
                  <td>
                    <div className='text-[15px]'>{item.variant}</div>
                  </td>
                  <td>
                    <input
                      type='number'
                      value={item.quantity}
                      min='1'
                      className='w-[50px] p-2 border rounded'
                      onChange={e => {
                        const newQuantity = parseInt(e.target.value, 10)
                        if (newQuantity >= 1) {
                          handleQuantityChange(
                            item._id,
                            item.variant,
                            newQuantity
                          )
                        }
                      }}
                    />
                  </td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>
                    <button
                      className='text-red-500 hover:text-red-700'
                      onClick={() => handleDelete(item._id, item.variant)}
                    >
                      <DeleteOutlineOutlined sx={{ fontSize: '30px' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='border p-5 flex h-fit justify-end items-center gap-6'>
            <p className='text-[20px]'>
              <span>
                {' '}
                Total (
                {cartItems.filter(item => item.selected).length === 1
                  ? '1 item'
                  : `${cartItems.filter(item => item.selected).length} items`}
                ):{' '}
              </span>{' '}
              <span>
                <strong>{formatCurrency(finalTotal)}</strong>
              </span>
            </p>
            <button
              className='p-3 md:w-[300px] w-full rounded-sm hover:bg-white hover:text-black border-2 text-[10px] md:text-[15px] transition-all duration-200 font-semibold border-black bg-black text-white'
              onClick={() => navigate('/cart/checkout')}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
