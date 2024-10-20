/* eslint-disable react/prop-types */
import { Lock, Eye, AtSign } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../../../service/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slices/authSlice";

const Form = ({ setErrMsg }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrMsg(null);
    try {
      const res = await authService.login(data);
      dispatch(loginSuccess({ token: res.data.data.token }));
      localStorage.setItem('token_sims_ppob', res.data.data.token)
      navigate("/");
    } catch (error) {
      setErrMsg(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <AtSign className="absolute top-3 left-3 text-gray-400" size={20} />
        <input
          type="email"
          {...register("email")}
          placeholder="Masukkan email anda"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>

      <div className="relative">
        <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
        <input
          {...register("password")}
          type={hidePassword ? "password" : "text"}
          placeholder="Buat password"
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
        <Eye
          onClick={() => setHidePassword(!hidePassword)}
          className="absolute top-3 right-3 text-gray-400 cursor-pointer"
          size={20}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 disabled:opacity-40"
      >
        {loading ? "Masuk..." : "Masuk"}
      </button>
    </form>
  );
};

export default Form;
