import React, { useState } from 'react';
import { Person2Outlined, LogoutOutlined, ShoppingBagOutlined, EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../assets/images/default-profile.jpg'

const Profile = () => {

  const user = JSON.parse(sessionStorage.getItem('user'))
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});

  let profileImage = defaultProfileImage
  if (user) {
    profileImage = user.image || defaultProfileImage
  }

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    navigate('/')
  }

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
  }

  const handleSave = () => {
    // Implement save functionality here, e.g., API call to update user data
    sessionStorage.setItem('user', JSON.stringify(editedUser));
    setIsEditing(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="md:p-20 pt-8 mx-auto w-5/6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="flex md:flex-row flex-col">

        {/* Navigation */}
        <div className="md:w-1/6 w-full mr-4">
          <button className="flex items-center mb-4 bg-white p-4 border border-gray-300" onClick={() => navigate('/profile')}>
            <Person2Outlined sx={{ fontSize: 30, marginRight: 1 }} />
            <span className="text-xl">My Profile</span>
          </button>
          <button className="flex items-center mb-4 bg-white p-4 border border-gray-300" onClick={() => navigate('/cart')}>
            <ShoppingBagOutlined sx={{ fontSize: 30, marginRight: 1 }} />
            <span className="text-xl">My Purchase</span>
          </button>
          {user && (
            <button className="flex items-center mb-4 bg-white p-4 border border-gray-300" onClick={handleLogout}>
              <LogoutOutlined sx={{ fontSize: 30, marginRight: 1 }} />
              <span className="text-xl">Log out</span>
            </button>
          )}
        </div>

        {/* Profile */}
        <div className="md:w-5/6 w-full p-6 border border-gray-300 flex md:flex-row flex-col gap-4 justify-between">
          <div className="md:w-3/4 w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">My Profile</h2>
              {!isEditing && (
                <button onClick={handleEditClick} className="flex items-center hover:scale-110 transition-all duration-300">
                  <EditOutlined />
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editedUser.firstName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                />
              </div>
              <div>
                <label className="block mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editedUser.lastName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                  placeholder="abc@gmail.com"
                />
              </div>
              <div>
                <label className="block mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phone || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                  placeholder="(xxx) xx-xxxx"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={editedUser.address || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <a href={`/change-password`} className="text-sm text-black underline">Change password</a>
            </div>
            {isEditing && (
              <div className="flex space-x-4 justify-end mt-4">
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                <button onClick={handleCancelEdit} className="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
              </div>
            )}
          </div>

          <div className="flex items-center flex-col justify-center gap-4">
            <img src={profileImage} alt="Person with a cityscape background" className="rounded-full w-40 h-40 object-cover mr-4" />
            {isEditing && (
              <label className="bg-gray-200 p-2 rounded cursor-pointer">
                Select Image
                <input type="file" id="selectImage" className="hidden" />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
