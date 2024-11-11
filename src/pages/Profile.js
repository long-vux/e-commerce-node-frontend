import React from 'react';
import { Person2Outlined, LogoutOutlined, ShoppingBagOutlined } from '@mui/icons-material';

const Profile = () => {
  return (
    <div className="md:p-20 pt-8 mx-auto w-5/6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="flex md:flex-row flex-col">

        {/* navigation */}
        <div className="md:w-1/6 w-full mr-4">
          <div className="flex items-center mb-4 bg-white p-4 border border-1 border-gray-300">
            <Person2Outlined sx={{ fontSize: 30, marginRight: 1 }} />
            <span className="text-xl">My profile</span>
          </div>
          <div className="flex items-center mb-4 bg-white p-4 border border-1 border-gray-300">
            <ShoppingBagOutlined sx={{ fontSize: 30, marginRight: 1 }} />
            <span className="text-xl">My Purchase</span>
          </div>
          <div className="flex items-center mb-4 bg-white p-4 border border-1 border-gray-300">
            <LogoutOutlined sx={{ fontSize: 30, marginRight: 1 }} />
            <span className="text-xl">Log out</span>
          </div>
        </div>
        {/* profile */}
        <div className="md:w-5/6 w-full p-6 border border-1 border-gray-300 flex md:flex-row flex-col gap-4 justify-between">
          <div className="md:w-3/4 w-full">
            <h2 className="text-xl font-bold mb-6">My Profile</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block mb-2">First name</label>
                <input type="text" className="w-full p-2 border rounded bg-gray-100" />
              </div>
              <div>
                <label className="block mb-2">Last name</label>
                <input type="text" className="w-full p-2 border rounded bg-gray-100" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block mb-2">Email address</label>
                <input type="email" className="w-full p-2 border rounded bg-gray-100" placeholder="abc@gmail.com" />
              </div>
              <div>
                <label className="block mb-2">Phone</label>
                <input type="text" className="w-full p-2 border rounded bg-gray-100" placeholder="(xxx) xx-xxxx" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <input type="text" className="w-full p-2 border rounded bg-gray-100" />
            </div>
            <div className=" gap-4">
              <div className="flex items-center justify-between">
                <label className="block mb-2">Password</label>
                <a href="#" className="text-sm text-black underline">* Change password</a>
              </div>
              <input type="password" className="w-full p-2 border rounded bg-gray-100" />
            </div>
          </div>
          <div className="flex items-center flex-col justify-center gap-4">
            <img src="https://placehold.co/100x100" alt="Profile image of a person with a cityscape background" className="rounded-full w-40 h-40 object-cover mr-4" />
            <label className="bg-gray-200 p-2 rounded cursor-pointer">
              Select Image
              <input type="file" id="selectImage" className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
