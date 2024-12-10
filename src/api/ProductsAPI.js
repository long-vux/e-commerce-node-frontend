// src/api/ProductsAPI.js
import axios from "axios"; // For non-authorized requests

const BASE_URL = process.env.REACT_APP_API_URL;

const ProductsAPI = {
  // Search products (no authorization needed)
  searchProducts: async (name) => {
    try {
      const response = await axios.get(`${BASE_URL}api/product/search/`, { params: { name } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to search products");
    }
  },

  // Sort products by price (no authorization needed)
  sortByPrice: async (order = "asc") => {
    try {
      const response = await axios.get(`${BASE_URL}api/product/sort-by-price`, { params: { order } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to sort products");
    }
  },

  // Get all products (no authorization needed)
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/product`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch products");
    }
  },

  // Get a product by ID (no authorization needed)
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}api/product/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch product details");
    }
  },

  // Add a new product (requires authorization)
  addProduct: async (formData) => {
    const token = localStorage.getItem('token');
    const cleanToken = token.replace(/['"]/g, '');
    try {
      const response = await axios.post(`${BASE_URL}api/admin/add-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add product");
    }
  },

  // Update a product by ID (requires authorization)
  updateProduct: async (productId, formData) => {
    console.log('formData: ', formData)
    try {
      const token = localStorage.getItem('token');
      const cleanToken = token.replace(/['"]/g, '');
      const response = await axios.put(`${BASE_URL}api/admin/update-product/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update product");
    }
  },

  // Delete a product by ID (requires authorization)
  deleteProduct: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const cleanToken = token.replace(/['"]/g, '');
      const response = await axios.delete(`${BASE_URL}api/admin/delete-product/${id}`, {
        headers: {
          authorization: `Bearer ${cleanToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete product");
    }
  },
};

export default ProductsAPI;
