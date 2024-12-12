import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Admin/Dashboard'
import Layout from '../components/admin/layout/Layout'
import Product from '../Admin/Product'
import Order from '../Admin/Order'
import Coupon from '../Admin/Coupon'
import User from '../Admin/User'
import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
const AdminRoutes = () => {

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  if (decodedToken.role !== 'admin') {
    return <Navigate to='/' />
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