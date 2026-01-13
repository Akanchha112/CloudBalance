import axios from "axios";
import API_BASE_URL from "../config/api";
import { getAuthHeaders } from "./authHeaders";
import api from "./axiosInstance";
// const getAuthHeaders = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   const refreshToken = localStorage.getItem("refreshToken");
//   return {
//     Authorization: `Bearer ${accessToken}`,
//     "X-Refresh-Token": refreshToken,
//   };
// };

export const getAllAccounts = async () => {
  try {
    const response = await api.get("/api/accounts", {
      headers: getAuthHeaders()
    });
    return response;

  } catch (error) {
    console.error("Failed to fetch accounts:", error);
    throw error;
  }
};