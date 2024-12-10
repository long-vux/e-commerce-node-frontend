import React, { useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Admin/Dashboard'
import Layout from '../components/admin/layout/Layout'
import Product from '../Admin/Product'
import Order from '../Admin/Order'
import Coupon from '../Admin/Coupon'
import User from '../Admin/User'
import { UserContext } from '../contexts/UserContext'
import { Navigate } from 'react-router-dom'

const AdminRoutes = () => {
  // admin only
  const { user } = useContext(UserContext)
  if (!user || user.role !== 'admin') {
    return <Navigate to='/login' />
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
            <User/>
          </Layout>
        }
      />
    </Routes>
  )
}

export default AdminRoutes
