import React, { useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {jwtDecode } from 'jwt-decode';
import Dashboard from '../Admin/Dashboard';
import Layout from '../components/admin/layout/Layout';
import Product from '../Admin/Product';
import Order from '../Admin/Order';
import Coupon from '../Admin/Coupon';
import User from '../Admin/User';

const AdminRoutes = () => {
  // admin only
  const token = localStorage.getItem('token');
  
  // Check if there's a token and decode it
  let isAdmin = false;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.role === 'admin';  // Check if the role is 'admin'
    } catch (error) {
      console.error('Token decoding failed', error);
    }
  }

  // If user is not admin, redirect them to login or other route
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route
        path='/dashboard'
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path='/product'
        element={
          <Layout>
            <Product />
          </Layout>
        }
      />
      <Route
        path='/order'
        element={
          <Layout>
            <Order />
          </Layout>
        }
      />
      <Route
        path='/coupon'
        element={
          <Layout>
            <Coupon />
          </Layout>
        }
      />
      <Route
        path='/user'
        element={
          <Layout>
            <User />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;