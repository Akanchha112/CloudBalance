import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAccount: null,
  allAccounts: [],
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.allAccounts = action.payload;
      // Auto-select first account if none selected
      if (!state.selectedAccount && action.payload.length > 0) {
        state.selectedAccount = action.payload[0];
      }
    },
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearAccounts: () => initialState,
  },
});

export const { 
  setAccounts, 
  setSelectedAccount, 
  setLoading, 
  setError, 
  clearAccounts 
} = accountSlice.actions;

export default accountSlice.reducer;