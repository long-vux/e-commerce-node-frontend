import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const OrderAPI = {
  // Get orders of the authenticated user
  getOrdersOfUser: async () => {
    const token = localStorage.getItem('token');
    const cleanToken = token.replace(/['"]/g, '');
    try {
      const response = await axios.get(`${BASE_URL}api/order/get-orders-of-user`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch user orders");
    }
  },

  // Get details of a specific order by ID
  getOrderDetails: async (orderId) => {
    const token = localStorage.getItem('token');
    const cleanToken = token.replace(/['"]/g, '');
    try {
      const response = await axios.get(`${BASE_URL}api/order/get-order-details/${orderId}`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch order details");
    }
  },

  // Update an order by ID (requires admin authorization)
  updateOrder: async (orderId, formData) => {
    const token = localStorage.getItem('token');
    const cleanToken = token.replace(/['"]/g, '');
    try {
      const response = await axios.put(`${BASE_URL}api/order/${orderId}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update order");
    }
  },

  // Delete an order by ID (requires admin authorization)
  deleteOrder: async (orderId) => {
    const token = localStorage.getItem('token');
    const cleanToken = token.replace(/['"]/g, '');
    try {
      const response = await axios.delete(`${BASE_URL}api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete order");
    }
  },
};

export default OrderAPI;
