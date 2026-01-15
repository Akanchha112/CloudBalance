// src/utils/UserApiUtil.js - SIMPLIFIED VERSION
import api from "./axiosInstance";

export const getUser = async () => {
  try {
    const response = await api.get("/api/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (payload) => {
  try {
    const response = await api.post("/api/users", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/api/users/${id}`, userData);
    return response.data;
  } catch (error) {
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

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
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