// src/api/ProductsAPI.js
import useAxios from '../utils/axiosInstance'; // Hook with authorization handling
import axios from "axios"; // For non-authorized requests

const BASE_URL = process.env.REACT_APP_API_URL;

const ProductsAPI = {
  // Search products (no authorization needed)
  searchProducts: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}api/product/search`, { params: { query } });
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

//   // Add a new product (requires authorization)
//   addProduct: async (productData) => {
//     try {
//       const axiosInstance = useAxios(); // Use hook for authorized instance
//       const response = await axiosInstance.post(`api/add-product`, productData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Failed to add product");
//     }
//   },

//   // Update a product by ID (requires authorization)
//   updateProduct: async (id, productData) => {
//     try {
//       const axiosInstance = useAxios(); // Use hook for authorized instance
//       const response = await axiosInstance.put(`api/product/${id}`, productData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Failed to update product");
//     }
//   },

//   // Delete a product by ID (requires authorization)
//   deleteProduct: async (id) => {
//     try {
//       const axiosInstance = useAxios(); // Use hook for authorized instance
//       const response = await axiosInstance.delete(`api/product/${id}`);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Failed to delete product");
//     }
//   },
};

export default ProductsAPI;
