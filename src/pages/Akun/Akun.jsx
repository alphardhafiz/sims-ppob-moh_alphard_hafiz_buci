import { AtSign, PencilIcon, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useEffect, useState, useRef } from "react";
import ProfilePicture from "../../assets/Profile Photo.png";
import { useNavigate } from "react-router-dom";
import profileService from "../../service/profileService";
import { setProfile } from "../../redux/slices/profileSlice";

const Akun = () => {
  const [isEdit, setIsEdit] = useState(false);
  const profile = useSelector((state) => state.profile).profile;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref untuk input file

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log({ data });
      await profileService.updateProfile(data);
      const profileRes = await profileService.getProfile();
      dispatch(setProfile(profileRes.data.data));
      setIsEdit(false)
    } catch (error) {
      console.log({ error });
    }
  };

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0]; // Ambil file yang dipilih
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await profileService.updateImageProfile(formData);
        const profileRes = await profileService.getProfile();
        dispatch(setProfile(profileRes.data.data));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token_sims_ppob");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={
              profile.profile_image ===
              "https://minio.nutech-integrasi.com/take-home-test/null"
                ? ProfilePicture
                : profile.profile_image
            }
            alt={profile.first_name}
            className="w-24 h-24 rounded-full"
          />
          {/* Button untuk membuka file input */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()} // Trigger input file saat diklik
            className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
          >
            <PencilIcon size={16} className="text-gray-600" />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-semibold">
          {profile.first_name} {profile.last_name}
        </h2>
      </div>

      {/* Input file untuk memilih gambar, disembunyikan */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef} // Menghubungkan ref ke input file
        style={{ display: "none" }} // Sembunyikan input
        onChange={handleImageChange} // Trigger saat file dipilih
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <AtSign className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Masukkan email anda"
            {...register("email")}
            readOnly={!isEdit}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div className="relative">
          <User className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="text"
            {...register("first_name")}
            readOnly={!isEdit}
            placeholder="Nama Depan"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div className="relative">
          <User className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="text"
            {...register("last_name")}
            readOnly={!isEdit}
            placeholder="Nama Belakang"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {isEdit ? (
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Simpan
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEdit(true)}
              className="w-full py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              type="button"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Akun;
