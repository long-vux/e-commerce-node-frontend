import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const ReviewAPI = {
  // Add a review for a product
  addReview: async (productId, reviewData) => {
    const token = localStorage.getItem("token");
    const cleanToken = token?.replace(/['"]/g, "");
    try {
      const response = await axios.post(
        `${BASE_URL}api/review/${productId}`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add review"
      );
    }
  },

  // Get all reviews for a specific product
  getReviews: async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}api/review/getReviews/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  },

  // Update a review by ID (requires authentication)
  updateReview: async (reviewId, reviewData) => {
    const token = localStorage.getItem("token");
    const cleanToken = token?.replace(/['"]/g, "");
    try {
      const response = await axios.put(
        `${BASE_URL}api/review/updateReview/${reviewId}`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update review"
      );
    }
  },
};

export default ReviewAPI;
