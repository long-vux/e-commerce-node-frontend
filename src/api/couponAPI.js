import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const CouponAPI = {
  // Create a new coupon (requires authorization)
  createCoupon: async (formData) => {
    const token = localStorage.getItem('token');
    const cleanToken = token.replace(/['"]/g, '');
    try {
      const response = await axios.post(`${BASE_URL}api/coupon/create`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create coupon");
    }
  },

  // Update a coupon by ID (requires authorization)
  updateCoupon: async (couponId, formData) => {
    const token = localStorage.getItem('token');
    const cleanToken = token.replace(/['"]/g, '');
    try {
      const response = await axios.put(`${BASE_URL}api/coupon/update/${couponId}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update coupon");
    }
  },

  // Get a coupon by ID (no authorization needed)
  getCouponById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}api/coupon/getById/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch coupon details");
    }
  },

  // Get all coupons (no authorization needed)
  getAllCoupons: async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/coupon/getAll`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch coupons");
    }
  },

  // Delete a coupon by ID (requires authorization)
  deleteCoupon: async (id) => {
    const token = localStorage.getItem('token');
    const cleanToken = token.replace(/['"]/g, '');
    try {
      const response = await axios.delete(`${BASE_URL}api/coupon/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete coupon");
    }
  },
};

export default CouponAPI;
