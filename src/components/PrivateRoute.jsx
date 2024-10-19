/* eslint-disable react/prop-types */
import { useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import profileService from "../service/profileService"; // Pastikan service yang dipanggil di-import
import informationService from "../service/informationService";
import transactionService from "../service/transactionService";
import { setProfile } from "../redux/slices/profileSlice";
import { setBalance } from "../redux/slices/balanceSlice";
import { setServices } from "../redux/slices/servicesSlice";
import { setBanners } from "../redux/slices/bannerSlice";

const PrivateRoute = ({ element: Component }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil token dari localStorage
  const token = localStorage.getItem("token_sims_ppob");

  const retrieveInformation = useCallback(async () => {
    try {
      const [profileRes, bannerRes, serviceRes, balanceRes] = await Promise.all([
        profileService.getProfile(),
        informationService.getBanner(),
        informationService.getServices(),
        transactionService.getBalance(),
      ]);
      dispatch(setProfile(profileRes.data.data));
      dispatch(setBanners(bannerRes.data.data));
      dispatch(setServices(serviceRes.data.data));
      dispatch(setBalance(balanceRes.data.data.balance));
    } catch (error) {
      console.log({ error });
      console.log(error.response.data.message);
      if (error.response.data.message === 'Token tidak tidak valid atau kadaluwarsa') {
        navigate('/login');
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (token) {
      // Simpan token di Redux state
      dispatch(loginSuccess({ token }));

      // Ambil informasi tambahan setelah token berhasil ditemukan
      retrieveInformation();
    }
  }, [token, dispatch, retrieveInformation]);

  // Jika token tidak ada, redirect ke halaman login
  return token ? <Layout>{Component}</Layout> : <Navigate to="/login" />;
};

export default PrivateRoute;
