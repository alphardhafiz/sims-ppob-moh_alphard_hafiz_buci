import axiosInstance from "../utils/axiosInstance";

const transactionService = {
  getBalance: () => {
    return axiosInstance.get("/balance");
  },
  topup: (payload) => {
    return axiosInstance.post("/topup", payload);
  },
  transaction: (payload) => {
    return axiosInstance.post('/transaction', payload)
  },
  getHistory: () => {
    return axiosInstance.get('/transaction/history')
  }
};

export default transactionService;
