// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
//   accessToken: null,
//   isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
    //   state.accessToken = action.payload.accessToken;
    //   state.isAuthenticated = true;
    },
    clearAuth: () => initialState,
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
