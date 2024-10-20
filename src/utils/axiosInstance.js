import axios from "axios";
import baseUrl from "./baseUrl";
import store from "../store";

const axiosInstance = axios.create({
  baseURL: baseUrl(),
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
