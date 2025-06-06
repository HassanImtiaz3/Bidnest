import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPaginatedUsersWithPosts = async (page = 1, limit = 10) => {
  try {
    const response = await api.get("/user/getAllUsers", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated users with posts:", error);
    throw error;
  }
};

export const getPaginatedVendorsWithProposal = async (page = 1, limit = 10) => {
    try {
      const response = await api.get("/vendor/getAllVendors", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching paginated users with posts:", error);
      throw error;
    }
  };

export default {
  getPaginatedUsersWithPosts,
};
