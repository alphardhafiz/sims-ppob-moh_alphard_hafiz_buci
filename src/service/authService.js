import axiosInstance from "../utils/axiosInstance";

const authService = {
  register: (payload) => {
    return axiosInstance.post("/registration", payload);
  },
  login: (payload) => {
    return axiosInstance.post("/login", payload);
  },
};

export default authService;
