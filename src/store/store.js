import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const accountPersistConfig = {
  key: "account",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedAccountReducer = persistReducer(accountPersistConfig, accountReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    account: persistedAccountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);