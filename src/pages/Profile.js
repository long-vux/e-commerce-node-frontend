import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Person2Outlined, LogoutOutlined, ShoppingBagOutlined,
  EditOutlined, AddOutlined, DeleteOutlined, LockResetOutlined,
} from '@mui/icons-material';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../assets/images/default-profile.jpg';
import { getProvinces, getDistricts, getWards } from '../utils/addressService';
import useAxios from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';

const Profile = () => {
  const { user, logout, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const axios = useAxios();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);

  // Address Fields
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [street, setStreet] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState(user?.phone || '');
  const [deliveryCode, setDeliveryCode] = useState('');

  const [error, setError] = useState('');

  // Fetch user profile and addresses on load
  useEffect(() => {
    if (user) {
      setEditedUser(user);
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/addresses`);
      setAddresses(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  }, [axios]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
    setPreview(null);
    closeModal();
  };

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('firstName', editedUser.firstName);
      formData.append('lastName', editedUser.lastName);
      formData.append('phone', editedUser.phone);
      if (file) {
        formData.append('image', file);
      }
      await updateUser(formData);
      window.location.reload();
      toast.success('Profile updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      toast.error(error.response || 'An error occurred');
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreview(previewURL);
    } else {
      setPreview(null);
    }
  };

  const handleAddressSave = async () => {
    try {
      if (!selectedProvince || !selectedDistrict || !selectedWard || !street || !receiverName || !receiverPhone) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (isEditMode && currentAddressId) {
        await axios.put(`${process.env.REACT_APP_API_URL}api/user/updateAddress/${currentAddressId}`, {
          province: selectedProvince,
          district: selectedDistrict,
          ward: selectedWard,
          street,
          deliveryCode,
          receiverName,
          receiverPhone,
        });
        toast.success('Address updated successfully');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}api/user/addAddress`, {
          province: selectedProvince,
          district: selectedDistrict,
          ward: selectedWard,
          street,
          deliveryCode,
          receiverName,
          receiverPhone,
        });
        toast.success('Address added successfully');
      }
      closeModal();
      fetchAddresses();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}api/user/deleteAddress/${addressId}`);
      toast.success('Address deleted successfully');
      fetchAddresses();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const openModalForEdit = (address) => {
    setIsEditMode(true);
    setCurrentAddressId(address._id);
    setReceiverName(address.receiverName);
    setReceiverPhone(address.receiverPhone);
    setSelectedProvince(address.province);
    setSelectedDistrict(address.district);
    setSelectedWard(address.ward);
    setStreet(address.street);
    setIsModalOpen(true);
  };

  const openModalForNew = () => {
    setIsEditMode(false);
    setReceiverName('');
    setReceiverPhone(user?.phone || '');
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');
    setStreet('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAddressId(null);
    setReceiverName('');
    setReceiverPhone(user?.phone || '');
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');
    setStreet('');
  };

  return (
    <div className="md:p-20 pt-8 mx-auto w-5/6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="flex md:flex-row flex-col">
        {/* Navigation Section */}
        <div className="md:w-1/5 w-full mr-4">
          {/* Navigation Buttons */}
          <button className="flex items-center mb-4 p-4 border w-full bg-black text-white " onClick={() => navigate('/profile')}>
            <Person2Outlined sx={{ fontSize: 30, marginRight: 1 }} />
            <span className="text-xl">My Profile</span>
          </button>
          <button className="flex items-center mb-4 bg-white p-4 border w-full hover:bg-black hover:text-white transition-all duration-300" onClick={() => navigate('/cart')}>
            <ShoppingBagOutlined sx={{ fontSize: 30, marginRight: 1 }} />
            <span className="text-xl">My Purchase</span>
          </button>
          {user && (
            <button className="flex items-center mb-4 bg-white p-4 border w-full hover:bg-black hover:text-white transition-all duration-300" onClick={handleLogout}>
              <LogoutOutlined sx={{ fontSize: 30, marginRight: 1 }} />
              <span className="text-xl">Log out</span>
            </button>
          )}
        </div>

        {/* Profile Section */}
        <div className="md:w-5/6 w-full">
          <div className="p-6 border border-gray-300 flex md:flex-row flex-col gap-4 justify-between">
            <div className="md:w-3/4 w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">My Profile</h2>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="flex items-center hover:scale-110 transition-all duration-300"
                  >
                    <EditOutlined />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={editedUser.firstName || ''}
                  onChange={(e) =>
                    setEditedUser((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={editedUser.lastName || ''}
                  onChange={(e) =>
                    setEditedUser((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <TextField
                  label="Email Address"
                  name="email"
                  value={editedUser.email || ''}
                  disabled
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={editedUser.phone || ''}
                  onChange={(e) =>
                    setEditedUser((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                />
              </div>

              <h3 className="text-lg font-semibold mb-2">Shipping Addresses</h3>
              {addresses.map((address) => (
                <div key={address._id} className="border p-4 mb-2 rounded relative">
                  {isEditing && (
                    <>
                      <button
                        className="absolute top-2 right-2 text-red-500"
                        onClick={() => handleDeleteAddress(address._id)}
                      >
                        <DeleteOutlined />
                      </button>
                      <button
                        className="absolute top-2 right-10 text-blue-500"
                        onClick={() => openModalForEdit(address)}
                      >
                        <EditOutlined />
                      </button>
                    </>
                  )}
                  <p>
                    <strong>Address:</strong> {address.street}, {address.ward}, {address.district}, {address.province}
                  </p>
                  <p>
                    <strong>Receiver Name:</strong> {address.receiverName}
                  </p>
                  <p>
                    <strong>Receiver Phone:</strong> {address.receiverPhone}
                  </p>
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={openModalForNew}
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded"
                >
                  <AddOutlined className="mr-2" />
                  Add New Address
                </button>
              )}
              <div className="flex items-center justify-end mt-4">
                {isEditing && (
                  <>
                    <Button
                      onClick={handleProfileUpdate}
                      color="primary"
                      variant="contained"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      color="secondary"
                      variant="outlined"
                      className="ml-4"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center flex-col justify-center gap-4">
              <img
                src={preview || user?.image || defaultProfileImage}
                alt="Profile"
                className="rounded-full w-40 h-40 object-cover"
              />
              {isEditing && (
                <label className="bg-gray-200 p-2 rounded cursor-pointer">
                  Select Image
                  <input type="file" id="image" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Receiver Name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Receiver Phone"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Province"
            value={provinces.find((p) => p.name === selectedProvince)?.id}
            onChange={(e) => {
              const provinceId = e.target.value;
              const provinceName = provinces.find((p) => p.id === provinceId)?.name;
              setSelectedProvince(provinceName);
              getDistricts(provinceId).then(setDistricts);
              setSelectedDistrict('');
              setSelectedWard('');  
              setWards([]);
            }}
            fullWidth
            margin="normal"
          >
            {provinces.map((province) => (
              <MenuItem key={province.id} value={province.id}>
                {province.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="District"
            value={districts.find((d) => d.name === selectedDistrict)?.id}
            onChange={(e) => {
              const districtId = e.target.value;
              const districtName = districts.find((d) => d.id === districtId)?.name;
              setSelectedDistrict(districtName);
              getWards(districtId).then(setWards);
              setSelectedWard('');
              setDeliveryCode(districtId);
            }}
            fullWidth
            margin="normal"
            disabled={!selectedProvince}
          >
            {districts.map((district) => (
              <MenuItem key={district.id} value={district.id}>
                {district.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Ward"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            fullWidth
            margin="normal"
            disabled={!selectedDistrict}
          >
            {wards.map((ward) => (
              <MenuItem key={ward.id} value={ward.name}>
                {ward.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddressSave} color="primary" variant="contained">
            {isEditMode ? 'Update Address' : 'Save Address'}
          </Button>
          <Button onClick={closeModal} color="secondary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
