import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AddOutlined } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Divider,
  Radio,
  FormControlLabel
} from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup'
import { UserContext } from '../contexts/UserContext'
import { getProvinces, getDistricts, getWards } from '../utils/addressService'
import useAxios from '../utils/axiosInstance'
import { toast } from 'react-toastify'
import { calculateFee } from '../utils/ghnApi'
import { formatCurrency } from '../utils/formatCurrency'
import { useNavigate } from 'react-router-dom';

const StyledFormControlLabel = styled(props => <FormControlLabel {...props} />)(
  ({ theme }) => ({
    variants: [
      {
        props: { checked: true },
        style: {
          '.MuiFormControlLabel-label': {
            color: theme.palette.primary.main
          }
        }
      }
    ]
  })
)

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup()

  let checked = false

  if (radioGroup) {
    checked = radioGroup.value === props.value
  }

  return <StyledFormControlLabel checked={checked} {...props} />
}

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any
}

function Checkout() {
  const apiUrl = process.env.REACT_APP_API_URL
  const axios = useAxios()
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [chosenAddress, setChosenAddress] = useState(null) // State for the selected address
  const [tempAddress, setTempAddress] = useState(null) // State for the selected address
  const [cartItems, setCartItems] = useState([])
  const [totalWeight, setTotalWeight] = useState(0)

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentAddressId, setCurrentAddressId] = useState(null)

  // Address Fields
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [street, setStreet] = useState('')
  const [receiverEmail, setReceiverEmail] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [receiverPhone, setReceiverPhone] = useState(user?.phone || '')
  const [districtId, setDistrictId] = useState('')
  const [discount, setDiscount] = useState(0)
  const [finalTotal, setFinalTotal] = useState(0)
  const [shippingFee, setShippingFee] = useState(0)
  const [serviceTypeId, setServiceTypeId] = useState(1) //1: Express, 2: Standard, 3: Saving
  const [coupons, setCoupons] = useState([])
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const items = await fetchCartItems();

        // Calculate total weight
        const totalWeight = items.reduce(
          (total, item) => total + item.weight * item.quantity,
          0
        );
        setTotalWeight(totalWeight);
        fetchAddresses(totalWeight);

        const totalPrice = items.reduce((total, item) => total + item.price, 0);
        setTotalPrice(totalPrice);

        calculateFinalTotal(totalPrice);

        fetchCoupons();

      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCartData();
  }, [user]);

  useEffect(() => {
    calculateFinalTotal(totalPrice);
  }, [selectedCoupon, serviceTypeId, totalPrice, shippingFee, discount]);

  // ========================================================
  //                      Fetch Cart Items
  // ========================================================
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/cart/get-selected-items`, {
        withCredentials: true,
      });
      const cartItems = response.data.items;
      setCartItems(cartItems);
      return cartItems;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // ========================================================
  //                        Coupons
  // ========================================================
  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/coupon/getAll`, {
        withCredentials: true,
      });
      setCoupons(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCouponChange = (e) => {
    const couponId = e.target.value;
    setSelectedCoupon(couponId);

    const coupon = coupons.find((c) => c._id === couponId);
    const discount = coupon ? (coupon.discountPercentage * totalPrice) / 100 : 0;
    setDiscount(discount);
  };

  const handleServiceTypeChange = (e) => {
    setServiceTypeId(e.target.value);
  };

  // ========================================================
  //                Calculate Final Total
  // ========================================================
  const calculateFinalTotal = (totalPrice) => {
    let discountedTotal = totalPrice;

    if (discount) {
      discountedTotal -= discount;
    }

    switch (serviceTypeId) {
      case '3': // Express
        discountedTotal += 30000 + shippingFee + totalPrice * 0.1;
        break;
      case '2': // Standard
        discountedTotal += 15000 + shippingFee + totalPrice * 0.1;
        break;
      default: // Save
        discountedTotal += shippingFee + totalPrice * 0.1;
        break;
    }

    setFinalTotal(discountedTotal);
  };

  // ========================================================
  //                             Address
  // ========================================================

  const fetchAddresses = useCallback(async (weight) => {
    try {
      const response = await axios.get(`${apiUrl}api/user/addresses`);
      const addresses = response.data.data;
      setAddresses(addresses);
      setChosenAddress(addresses[0]);
      setTempAddress(addresses[0]);
      if (addresses[0]) {
        fetchShippingFee(addresses[0].districtId, weight);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  }, [axios, apiUrl]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces()
      setProvinces(data)
    }
    fetchProvinces()
  }, [])

  const handleAddingState = () => {
    setIsAdding(!isAdding)
  }

  const handleEdtitingState = () => {
    setIsAdding(!isAdding)
    setIsEditing(!isEditing)
    setIsEditMode(!isEditMode)
  }
  const handleAddressSave = async () => {
    try {
      if (
        !selectedProvince ||
        !selectedDistrict ||
        !selectedWard ||
        !street ||
        !receiverName ||
        !receiverPhone ||
        !receiverEmail
      ) {
        toast.error('Please fill in all required fields')
        return
      }

      if (isEditMode && currentAddressId) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/updateAddress/${currentAddressId}`,
          {
            province: selectedProvince,
            district: selectedDistrict,
            ward: selectedWard,
            street,
            receiverName,
            receiverPhone,
            receiverEmail,
            districtId
          }
        )
        toast.success('Address updated successfully')
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/addAddress`,
          {
            province: selectedProvince,
            district: selectedDistrict,
            ward: selectedWard,
            street,
            receiverName,
            receiverPhone,
            receiverEmail,
            districtId
          }
        )
        toast.success('Address added successfully')
      }
      handleAddingState()
      window.location.reload()
      fetchAddresses()
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred')
    }
  }

  const handleDeleteAddress = async addressId => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/deleteAddress/${addressId}`
      )
      toast.success('Address deleted successfully')
      fetchAddresses()
      fetchShippingFee(chosenAddress.districtId, totalWeight)
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred')
    }
  }

  const openModalForEdit = address => {
    setIsEditMode(true)
    setCurrentAddressId(address._id)
    setReceiverName(address.receiverName)
    setReceiverPhone(address.receiverPhone)
    setReceiverEmail(address.receiverEmail)
    setSelectedProvince(address.province)
    setSelectedDistrict(address.district)
    setSelectedWard(address.ward)
    setStreet(address.street)
    setIsModalOpen(true)
  }

  const openModalForNew = () => {
    setIsEditMode(false)
    setReceiverName('')
    setReceiverPhone(user?.phone || '')
    setReceiverEmail('')
    setSelectedProvince('')
    setSelectedDistrict('')
    setSelectedWard('')
    setStreet('')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentAddressId(null)
    setReceiverName('')
    setReceiverPhone(user?.phone || '')
    setReceiverEmail('')
    setSelectedProvince('')
    setSelectedDistrict('')
    setSelectedWard('')
    setStreet('')
  }

  // Handle chosen address

  const handleAddressSelect = async (event) => {
    const selectedId = event.target.value;
    const address = addresses.find(addr => addr._id === selectedId);
    setTempAddress(address);
    await fetchShippingFee(address.districtId, totalWeight);
  };

  const handleSaveAddressChanges = () => {
    if (chosenAddress) {
      setChosenAddress(tempAddress)
      setIsModalOpen(false)
    } else {
      toast.error('Please select an address.')
    }
  }

  // Calculate fee
  const fetchShippingFee = async (districtId, weight) => {
    try {
      const fee = await calculateFee(districtId, weight);
      setShippingFee(fee);
    } catch (error) {
      console.error('Error calculating fee:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!chosenAddress) {
        toast.error('Please select an address.')
        return
      }
      // authenticate user
      const address = `${chosenAddress.street}, ${chosenAddress.ward}, ${chosenAddress.district}, ${chosenAddress.province}`;

      const selectedItems = cartItems.map(item => ({
        productId: item._id,
        variant: item.variant
      }));

      const payload = {
        receiverName: chosenAddress.receiverName,
        receiverEmail: chosenAddress.receiverEmail,
        receiverPhone: chosenAddress.receiverPhone,
        address,
        selectedItems,
        total: finalTotal,
        discount,
        shippingFee,
        tax: totalPrice * 0.1,

      };

      // Send the checkout request
      const response = await axios.post(`${apiUrl}api/cart/checkout`, payload, {
        withCredentials: true
      });

      // Handle successful response
      console.log('Checkout successful', response.data);
      toast.success('Checkout successful!');
      navigate('/success'); // Navigate to a success page or handle accordingly
    } catch (error) {
      // Handle errors
      console.error('Error during checkout:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div class='flex justify-center items-center min-h-screen'>
      <div class='bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl'>
        <h1 class='text-2xl font-bold mb-6'>CHECK OUT</h1>
        <div class='flex flex-col md:flex-row gap-6'>
          <div class='flex-1'>
            <div class='border p-6 rounded-lg mb-6'>
              <h2 class='text-lg font-semibold mb-4'>Delivery address</h2>
              {addresses.length === 0 ? (
                <button
                  onClick={openModalForNew}
                  className='flex items-center bg-black text-white px-4 py-2 rounded hover:bg-white border border-black hover:text-black transition-all duration-300'
                >
                  <AddOutlined className='mr-2' />
                  Add New Address
                </button>
              ) : chosenAddress ? (
                <div className='border p-4 mb-2 rounded relative'>
                  <p>
                    <strong>Address:</strong> {chosenAddress.street},{' '}
                    {chosenAddress.ward},{chosenAddress.district},{' '}
                    {chosenAddress.province}
                  </p>
                  <p>
                    <strong>Receiver Name:</strong> {chosenAddress.receiverName}
                  </p>
                  <p className='w-full flex justify-between'>
                    <div>
                      <strong>Receiver Email:</strong>{' '}
                      {chosenAddress.receiverEmail}
                    </div>
                    <a
                      className='underline cursor-pointer'
                      onClick={openModalForNew}
                    >
                      change
                    </a>
                  </p>
                </div>
              ) : null}


            </div>
            <select
              className='border px-4 py-3 mr-2 w-full rounded-lg mb-4 pr-10 text-black font-semibold'
              value={selectedCoupon || ''}
              onChange={handleCouponChange}
            >
              <option value="" disabled>
                Apply coupon
              </option>
              {coupons.map(coupon => (
                <option key={coupon._id} value={coupon._id}>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>#{coupon.code} - {coupon.discountPercentage}% off - {coupon.maxUsage} remaining</span>
                  </div>
                </option>
              ))}
            </select>
            <select
              className="border px-4 py-3 mr-2 w-full rounded-lg mb-4 pr-10 text-black font-semibold"
              value={serviceTypeId || ''} // Ensures "Shipping method" is selected by default
              onChange={handleServiceTypeChange}
            >
              <option value="" disabled>
                Shipping method
              </option>
              {['1', '2', '3'].map(type => (
                <option key={type} value={type}>
                  {type === '1' ? 'Save' : type === '2' ? 'Standard' : 'Express '} - {formatCurrency(type === '1' ? shippingFee : type === '2' ? 15000 + shippingFee : 30000 + shippingFee)}
                </option>
              ))}
            </select>

          </div>
          <div class='w-full md:w-1/3'>
            <div class='border p-6 rounded-lg'>
              <h2 class='text-lg font-semibold mb-4'>Order Details</h2>
              {cartItems.map(item => (
                <div class='flex justify-between items-center mb-4'>
                  <div class='flex items-center'>
                    <img
                      src={item.image}
                      alt='Product image'
                      class='w-12 h-12 mr-4'
                    />
                    <div>
                      <p class='text-sm'>{item.name}</p>
                      <p class='text-sm'>x{item.quantity}</p>
                    </div>
                  </div>
                  <p class='text-sm'>{formatCurrency(item.price)}</p>
                </div>
              ))}
              <div class='border-t pt-2'>
                <div class='flex justify-between items-center mb-2'>
                  <p class='text-sm'>Total product value</p>
                  <p class='text-sm'>{formatCurrency(totalPrice)}</p>
                </div>
                <div class='flex justify-between items-center mb-2'>
                  <p class='text-sm text-red-500'>Discount</p>
                  <p class='text-sm text-red-500'>- {formatCurrency(discount)}</p>
                </div>
                <div class='flex justify-between items-center mb-2'>
                  <p class='text-sm'>Tax (10%)</p>
                  <p class='text-sm'>{formatCurrency(totalPrice * 0.1)}</p>
                </div>
                <div class='flex justify-between items-center mb-4'>
                  <p class='text-sm'>Shipping</p>
                  <p class='text-sm'>{formatCurrency(shippingFee + (serviceTypeId === '2' ? 15000 : serviceTypeId === '3' ? 30000 : 0))}</p>
                </div>
                <div class='flex justify-between items-center mb-4 border-t pt-2'>
                  <p class='text-lg font-semibold'>Total Price</p>
                  <p class='text-lg font-semibold'>{formatCurrency(finalTotal)}</p>
                </div>
                <button class='w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-white border border-black hover:text-black transition-all duration-300' onClick={handleCheckout}>
                  Pay now ({cartItems.filter(item => item.selected).length === 1 ? '1 item' : `${cartItems.filter(item => item.selected).length} items`})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        fullWidth
        maxWidth='sm'
        className='p-4 transition-all duration-500'
      >
        {isAdding ? (
          <>
            <DialogTitle>
              {isEditMode ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
            <DialogContent>
              <TextField
                label='Receiver Name'
                value={receiverName}
                onChange={e => setReceiverName(e.target.value)}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Receiver Phone'
                value={receiverPhone}
                onChange={e => setReceiverPhone(e.target.value)}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Receiver Email'
                value={receiverEmail}
                onChange={e => setReceiverEmail(e.target.value)}
                fullWidth
                margin='normal'
              />
              <TextField
                select
                label='Province'
                value={
                  provinces.find(p => p.provinceName === selectedProvince)?.provinceID || ''
                }
                onChange={e => {
                  const provinceCode = e.target.value
                  const provinceName = provinces.find(
                    p => p.provinceID === provinceCode
                  )?.provinceName
                  setSelectedProvince(provinceName)
                  getDistricts(provinceCode).then(setDistricts)
                  setSelectedDistrict('')
                  setSelectedWard('')
                  setWards([])
                }}
                fullWidth
                margin='normal'
              >
                {provinces.map(province => (
                  <MenuItem key={province.provinceID} value={province.provinceID}>
                    {province.provinceName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label='District'
                value={
                  districts.find(d => d.districtName === selectedDistrict)?.districtID || ''
                }
                onChange={e => {
                  const districtCode = e.target.value
                  const districtName = districts.find(
                    d => d.districtID === districtCode
                  )?.districtName
                  setDistrictId(districtCode)
                  setSelectedDistrict(districtName)
                  getWards(districtCode).then(setWards)
                  setSelectedWard('')
                }}
                fullWidth
                margin='normal'
                disabled={!selectedProvince}
              >
                {districts.map(district => (
                  <MenuItem key={district.districtID} value={district.districtID}>
                    {district.districtName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label='Ward'
                value={wards.find(w => w.wardName === selectedWard)?.wardCode || ''}
                onChange={e => {
                  const wardCode = e.target.value
                  const wardName = wards.find(w => w.wardCode === wardCode)?.wardName
                  setSelectedWard(wardName)
                }}
                fullWidth
                margin='normal'
                disabled={!selectedDistrict}
              >
                {wards.map(ward => (
                  <MenuItem key={ward.wardCode} value={ward.wardCode}>
                    {ward.wardName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label='Street'
                value={street}
                onChange={e => setStreet(e.target.value)}
                fullWidth
                margin='normal'
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleAddressSave}
                color='primary'
                variant='contained'
              >
                {isEditMode ? 'Update Address' : 'Save Address'}
              </Button>
              <Button
                onClick={isEditing ? handleEdtitingState : handleAddingState}
                color='secondary'
                variant='outlined'
              >
                Cancel
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>My Address</DialogTitle>
            <DialogContent>
              {' '}
              <RadioGroup
                name='use-radio-group'
                defaultValue='first'
                value={tempAddress?._id || ''}
                onChange={handleAddressSelect}
              >
                {addresses.map(address => (
                  <div
                    key={address._id}
                    className='border p-4 mb-2 rounded relative flex items-start'
                  >
                    <MyFormControlLabel
                      key={address._id}
                      value={address._id}
                      control={<Radio color='default' />}
                    />{' '}
                    <div>
                      {' '}
                      <p>
                        <strong>Address:</strong>{' '}
                        {`${address.street}, ${address.ward}, ${address.district}, ${address.province}`}
                      </p>
                      <p>
                        <strong>Receiver Name:</strong> {address.receiverName}
                      </p>
                      <div className='w-full flex justify-between items-center'>
                        <p>
                          <strong>Receiver Phone:</strong>{' '}
                          {address.receiverPhone}
                        </p>
                        <button
                          className='underline text-blue-600 hover:text-blue-800 cursor-pointer'
                          onClick={() => handleDeleteAddress(address._id)}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <button
                onClick={handleAddingState}
                className='flex items-center hover:bg-black hover:text-white px-4 py-2 rounded bg-white border mb-3 text-black transition-all duration-300'
              >
                <AddOutlined className='mr-2' />
                Add New Address
              </button>
              <Divider />
              <div className='flex justify-end gap-2 items-center mt-3 w-full'>
                <button
                  className='flex items-center hover:bg-black hover:text-white px-4 py-2 rounded bg-white border mb-3 text-black transition-all duration-300'
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className='flex  items-center bg-black text-white px-4 py-2 rounded hover:bg-white border mb-3 hover:text-black transition-all duration-300'
                  onClick={handleSaveAddressChanges}
                >
                  Save Change
                </button>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  )
}

export default Checkout
