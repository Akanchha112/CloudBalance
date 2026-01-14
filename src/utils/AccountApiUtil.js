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
    const response = await api.get("/api/accounts/all", {
      headers: getAuthHeaders()
    });
    return response;

  } catch (error) {
    console.error("Failed to fetch accounts:", error);
    throw error;
  }
};
// Create a new account
export const createAccount = async (account) => {
  console.log(account);
  
  try {
    const response = await api.post("/api/accounts", account, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.log("error ",error);
    
    if (error.response && error.response.data) {
      return error.response.data; 
    }
    
    return {
      success: false,
      message: "Something went wrong",
      errorCode: "UNKNOWN_ERROR",
    };
  }
};