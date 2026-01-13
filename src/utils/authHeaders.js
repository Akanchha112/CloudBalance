// src/utils/authHeaders.js
import { store } from "../store/store";

export const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
