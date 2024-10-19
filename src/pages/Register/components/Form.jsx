/* eslint-disable react/prop-types */
import { User, Lock, Eye, AtSign } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../../../service/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Konfirmasi password tidak sama")
    .required("Konfirmasi password wajib diisi"),
});

const Form = ({ setErrMsg }) => {
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrMsg(null);
    try {
      delete data.confirmPassword;
      await authService.register(data);
      navigate("/login");
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
        <User className="absolute top-3 left-3 text-gray-400" size={20} />
        <input
          {...register("first_name")}
          type="text"
          placeholder="Nama depan"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>

      <div className="relative">
        <User className="absolute top-3 left-3 text-gray-400" size={20} />
        <input
          {...register("last_name")}
          type="text"
          placeholder="Nama belakang"
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

      <div className="relative">
        <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
        <input
          {...register("confirmPassword")}
          type={hideConfirmPassword ? "password" : "text"}
          placeholder="Konfirmasi password"
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
        <Eye
          onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
          className="absolute top-3 right-3 text-gray-400 cursor-pointer"
          size={20}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 disabled:opacity-40"
      >
        {loading ? "Registrasi..." : "Registrasi"}
      </button>
    </form>
  );
};

export default Form;
