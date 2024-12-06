import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Admin/Dashboard'; // Ensure this path is correct
import Reservation from '../Admin/Reservation'
import Layout from '../components/admin/layout/Layout';
import Product from '../Admin/Product';
import Order from '../Admin/Order';
import Coupon from '../Admin/Coupon';
const AdminRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<Layout><Dashboard/></Layout>} />
    <Route path="/product" element={<Layout><Product/></Layout>} />
    <Route path="/order" element={<Layout><Order/></Layout>} />
    <Route path="/coupon" element={<Layout><Coupon/></Layout>} />
    <Route path="/*" element={<Layout><Reservation/></Layout>} />
  </Routes>
);

export default AdminRoutes;
