import axiosInstance from "../utils/axiosInstance";

const informationService = {
  getBanner: () => {
    return axiosInstance.get("/banner");
  },
  getServices: () => {
    return axiosInstance.get('/services')
  }
};

export default informationService;
