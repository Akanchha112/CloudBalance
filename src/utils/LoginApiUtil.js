import API_BASE_URL from "../config/api"
import axios from "axios";
import api from "./axiosInstance";

export const loginCall = async (email, password) => {
  try {
    const response = await api.post("/login", {
      emailId: email,
      password: password
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const logout=()=>{

}
