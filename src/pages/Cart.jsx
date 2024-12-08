import React, { useState, useEffect, useContext } from 'react'
import { ShoppingCartOutlined, DeleteOutlineOutlined } from '@mui/icons-material'
import Checkbox from '@mui/material/Checkbox'
import emptyCart2 from '../assets/utilities/emptyCart.png'
import useAxios from '../utils/axiosInstance'
import { UserContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { Modal, Box, Typography, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import img4 from '../assets/images/item5-1.png'
const Cart = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const { user } = useContext(UserContext)
  const axios = useAxios()
  const navigate = useNavigate()

  // Initializing state for cart items and coupons
  const [cartItems, setCartItems] = useState([])
  const [coupons, setCoupons] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [finalTotal, setFinalTotal] = useState(0)
  const [addresses, setAddresses] = useState([])
  const [shippingFee, setShippingFee] = useState(0)
  const [districtId, setDistrictId] = useState(null)

  useEffect(() => {
    fetchCartItems()
    fetchCoupons()
    fetchAddresses()
  }, [axios, apiUrl, user])

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/cart/get-cart`, { withCredentials: true })
      setCartItems(response.data.cart.items)
      console.log('response.data.cart.items', response.data.cart.items)
      calculateFinalTotal(response.data.cart.items, discount)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/coupon/getAll`, { withCredentials: true })
      setCoupons(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchAddresses = async () => {
    if (!user) return
    try { 
      const response = await axios.get(`${apiUrl}api/user/addresses`, { withCredentials: true })
      setAddresses(response.data.data)
      console.log('addresses', response.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = (id, variant) => {
    axios.delete(`${apiUrl}api/cart/remove-item`, {
      data: {
        productId: id,
        variant: variant
      },
      withCredentials: true
    })
      .then(res => {
        fetchCartItems()
        toast.success('Item removed from cart')
      })
      .catch(err => {
        console.error(err)
        toast.error('Failed to remove item from cart')
      })
  }

  // Handle quantity change
  const handleQuantityChange = (id, variant, newQuantity) => {
    // Send the update request to the backend
    axios.put(`${apiUrl}api/cart/update-item`, {
      productId: id,
      variant: variant, // Ensure variant is a string
      quantity: newQuantity
    }, { withCredentials: true })
      .then(res => {
        // Fetch the updated cart items to ensure consistency
        fetchCartItems()
        toast.success('Cart updated successfully')
      })
      .catch(err => {
        console.error(err)
        toast.error('Failed to update cart')
        // Optionally, refetch to revert changes if the update fails
        fetchCartItems()
      })
  }

  // Calculate total price of cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0)
  }

  // Calculate final total after discount and shipping
  const calculateFinalTotal = (items, appliedDiscount) => {
    const total = items.reduce((sum, item) => sum + item.price, 0)
    const shipping = 2
    const discountedTotal = total - appliedDiscount + shipping
    setFinalTotal(discountedTotal)
  }

  // Handle Apply Coupon
  const handleApplyCoupon = () => {
    setIsModalOpen(true)
  }

  // Confirm applying the selected coupon
  const confirmApplyCoupon = () => {
    if (!selectedCoupon) {
      toast.error('Please select a coupon to apply')
      return
    }

    const coupon = coupons.find(c => c._id === selectedCoupon)
    if (!coupon) {
      toast.error('Invalid coupon selected')
      return
    }

    const total = calculateTotalPrice()
    const calculatedDiscount = (total * coupon.discountPercentage) / 100
    setDiscount(calculatedDiscount)
    calculateFinalTotal(cartItems, calculatedDiscount)
    toast.success(`Coupon "${coupon.code}" applied! You saved $${calculatedDiscount.toFixed(2)}`)
    setIsModalOpen(false)
  }

  return (
    <div className='p-10 border w-full h-full'>
      <h1 className='text-[30px] font-semibold mb-5'>
        SHOPPING CART <ShoppingCartOutlined />
      </h1>

      {/* Conditional rendering based on cartItems length */}
      {cartItems.length === 0 ? (
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='md:text-[30px] text-[20px] font-semibold'>Your cart is empty</h1>
          <img src={emptyCart2} alt='Empty Cart' className='w-1/2' />
        </div>
      ) : (
        <div className='flex gap-2'>
          <table className='border w-2/3'>
            <thead>
              <tr className='border'>
                <td className='p-3'>
                  <Checkbox defaultChecked color='default' /> Products
                </td>
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
                      <Checkbox defaultChecked color='default' />
                    </div>
                    <div className='w-[140px] h-[140px] border'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='object-cover w-full h-full'
                      />
                    </div>
                    <div className='ml-3 flex items-center cursor-pointer' onClick={() => navigate(`/product/${item.product._id}`)}>
                      <p className='text-[18px] font-bold'>{item.name}</p>
                    </div>
                  </td>
                  <td>
                    <br />
                    <div className='text-[15px]'>{item.variant}</div>
                  </td>
                  <td>
                    {/* Quantity Picker */}
                    <input
                      type='number'
                      value={item.quantity}
                      min='1'
                      className='w-[50px] p-2 border rounded'
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10)
                        if (newQuantity >= 1) {
                          handleQuantityChange(item._id, item.variant, newQuantity)
                        }
                      }}
                    />
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button className='text-red-500 hover:text-red-700' onClick={() => handleDelete(item._id, item.variant)}>
                      <DeleteOutlineOutlined sx={{ fontSize: '30px' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ORDER DETAILS */}
          <div className='border p-5 w-1/3 flex flex-col h-fit'>
            <h2 className='font-semibold text-[25px]'>Order Details</h2>

            <div className='border-b pb-3 w-full h-fit'>
              <div>
                <p className='flex justify-between items-center'>
                  <span>Total Products Value:</span>{' '}
                  <span>${calculateTotalPrice().toFixed(2)}</span>
                </p>
              </div>
              <div>
                <p className='flex justify-between items-center'>
                  <span>Discount:</span>{' '}
                  <span className='text-red-500'>-${discount.toFixed(2)}</span>
                </p>
              </div>
              <div>
                <p className='flex justify-between items-center'>
                  <span>Shipping:</span> <span>$ {shippingFee}</span>
                </p>
              </div>
            </div>
            <div className='mt-4'>
              <p className='flex justify-between items-center text-[25px]'>
                <span>
                  <strong>Total:</strong>
                </span>{' '}
                <span>
                  <strong>${finalTotal.toFixed(2)}</strong>
                </span>
              </p>
            </div>

            <button className='p-3 mt-2 rounded-sm hover:bg-white hover:text-black border-2 text-[15px] transition-all duration-200 font-semibold border-black bg-black text-white'>
              {cartItems.length > 0 ? `CHECK OUT (${cartItems.length})` : 'CHECK OUT'}
            </button>

            {/* Apply Coupon Button */}
            <button
              className='p-2 mt-4 rounded-sm hover:bg-gray-200 border-2 text-[15px] transition-all duration-200 font-semibold border-gray-400 bg-gray-100 text-black'
              onClick={handleApplyCoupon}
            >
              APPLY COUPON
            </button>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="apply-coupon-modal-title"
        aria-describedby="apply-coupon-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="apply-coupon-modal-title" variant="h6" component="h2">
            Select a Coupon
          </Typography>
          <RadioGroup
            aria-labelledby="coupon-radio-group"
            name="coupon-radio-group"
            value={selectedCoupon}
            onChange={(e) => setSelectedCoupon(e.target.value)}
          >
            {coupons.map((coupon) => (
              <FormControlLabel
                key={coupon._id}
                value={coupon._id}
                control={<Radio />}
                label={`${coupon.code} - ${coupon.discountPercentage}% off`}
              />
            ))}
          </RadioGroup>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={confirmApplyCoupon}>
              Apply
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Cart