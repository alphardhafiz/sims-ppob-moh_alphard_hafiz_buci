import { Link } from "react-router-dom";
import IllustrasiLogin from "../../assets/Illustrasi Login.png";
import Logo from "../../assets/Logo.png";
import Form from "./components/Form";
import { X } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const [errMsg, setErrMsg] = useState(null);
  return (
    <div className="flex h-lvh">
      <div className="flex-1">
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-white p-4">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center mb-8 gap-2">
              <img src={Logo} width={28} height={28} alt="" />
              <h1 className="text-xl font-bold">
                SIMS PPOB MOH ALPHARD HAFIZ BUCI
              </h1>
            </div>

            <h2 className="text-2xl font-bold text-center mb-8">
              Lengkapi data untuk membuat akun
            </h2>
            <Form setErrMsg={setErrMsg} />
            <p className="text-center mt-4">
              sudah punya akun? login{" "}
              <Link to="/login" className="text-red-500 font-semibold">
                di sini
              </Link>
            </p>
          </div>
          {errMsg && (
            <div className="absolute flex justify-between items-center bottom-4 bg-red-100 p-2 w-[95%] text-red-500 text-sm">
              {errMsg}
              <X
                onClick={() => setErrMsg(null)}
                className="text-red-500 cursor-pointer"
                size={16}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="w-full h-full">
          <img
            src={IllustrasiLogin}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
