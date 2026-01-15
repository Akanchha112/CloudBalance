import axios from "axios";
import API_BASE_URL from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // Don't add Authorization header to auth endpoints
    if (
      !config.url.includes("/login") &&
      !config.url.includes("/refresh") 
      // !config.url.includes("/logout")
    ) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const code =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.errorCode;

    if (
      originalRequest.url.includes("/login") ||
      originalRequest.url.includes("/refresh") ||
      originalRequest.url.includes("/logout")
    ) {
      return Promise.reject(error);
    }

    if (
      status === 401 &&
      code === "ACCESS_TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/refresh");
        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        forceLogout();
        return Promise.reject(refreshError);
      }
    }

    if (
      status === 403 &&
      (code === "SESSION_EXPIRED" || code === "INVALID_SESSION")
    ) {
      forceLogout();
    }

    return Promise.reject(error);
  }
);

const forceLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export default api;