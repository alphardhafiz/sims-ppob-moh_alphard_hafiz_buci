import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/authSlice";
import profileReducer from "./redux/slices/profileSlice";
import balanceReducer from "./redux/slices/balanceSlice";
import bannerReducer from "./redux/slices/bannerSlice";
import servicesReducer from "./redux/slices/servicesSlice";
import transactionReducer from "./redux/slices/transactionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    balance: balanceReducer,
    banners: bannerReducer,
    services: servicesReducer,
    transaction: transactionReducer,
  },
});

export default store;
