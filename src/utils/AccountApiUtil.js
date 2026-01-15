import axios from "axios";
import API_BASE_URL from "../config/api";
import { getAuthHeaders } from "./authHeaders";
import api from "./axiosInstance";


export const getAllAccounts = async () => {
  try {
    const response = await api.get("/api/accounts/all", {
      headers: getAuthHeaders()
    });
    return response;

  } catch (error) {
   throw error;
  }
};
// Create a new account
export const createAccount = async (account) => {
  try {
    const response = await api.post("/api/accounts", account, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    // console.log("error ",error);
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