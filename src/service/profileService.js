import axiosInstance from "../utils/axiosInstance";

const profileService = {
  getProfile: () => {
    return axiosInstance.get("/profile");
  },
  updateProfile: (payload) => {
    return axiosInstance.put("/profile/update", payload);
  },
  updateImageProfile: (payload) => {
    return axiosInstance.put('/profile/image', payload, {
      headers: {
        "Content-Type": "multipart/form-data", // Tentukan header untuk FormData
      },
    });
  }
};

export default profileService;
