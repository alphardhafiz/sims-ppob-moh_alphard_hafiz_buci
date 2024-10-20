import axiosInstance from "../utils/axiosInstance";

const transactionService = {
  getBalance: () => {
    return axiosInstance.get("/balance");
  },
  topup: (payload) => {
    return axiosInstance.post("/topup", payload);
  },
  transaction: (payload) => {
    return axiosInstance.post("/transaction", payload);
  },
  getHistory: ({ offset = 0, limit = 5 }) => {
    return axiosInstance.get(
      `/transaction/history?offset=${offset}&limit=${limit}`
    );
  },
};

export default transactionService;
