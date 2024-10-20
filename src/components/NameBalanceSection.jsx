import ProfilePicture from "../assets/Profile Photo.png";
import BackgroundSaldo from "../assets/Background Saldo.png";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import formatNumber from "../utils/formatNumber";
const NameBalanceSection = () => {
  const [hideBalance, setHideBalance] = useState(true);
  const profile = useSelector((state) => state.profile).profile;
  const balance = useSelector((state) => state.balance).balance;

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <div className="mb-2">
          <img
            src={
              profile.profile_image ===
              "https://minio.nutech-integrasi.com/take-home-test/null"
                ? ProfilePicture
                : profile.profile_image
            }
            className="rounded-full w-24 h-24 object-cover"
            alt=""
          />
        </div>
        <h2 className="text-lg text-gray-500 font-bold">Selamat datang,</h2>
        <h2 className="text-3xl font-bold">{`${
          profile?.first_name || ""
        } ${profile?.last_name || ""}`}</h2>
      </div>
      <div
        className="flex-[1.5] rounded-xl gap-1 flex flex-col justify-center pl-10"
        style={{
          backgroundImage: `url(${BackgroundSaldo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="text-white">Saldo anda</p>
        <h2 className="text-3xl text-white font-bold">
          RP {hideBalance ? "*****" : formatNumber(balance) || 0}
        </h2>
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={() => setHideBalance(!hideBalance)}
        >
          <p className="text-white font-bold">Lihat Sado</p>
          <Eye className="text-white " size={14} />
        </div>
      </div>
    </div>
  );
};

export default NameBalanceSection;
