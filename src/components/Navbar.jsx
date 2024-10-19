import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex items-center justify-between py-5 border-b-2 p-24">
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} width={28} height={28} alt="" />
        <h1 className="text-lg font-bold">SIMS PPOB MOH ALPHARD HAFIZ BUCI</h1>
      </Link>
      <div className="flex items-center gap-8">
        <Link
          className={`text-lg font-bold ${
            location.pathname === "/topup" ? "text-red-500" : "text-gray-500"
          }`}
          to="/topup"
        >
          Top Up
        </Link>
        <Link
          className={`text-lg font-bold ${
            location.pathname === "/transaction"
              ? "text-red-500"
              : "text-gray-500"
          }`}
          to="/transaction"
        >
          Transaction
        </Link>
        <Link
          className={`text-lg font-bold ${
            location.pathname === "/akun" ? "text-red-500" : "text-gray-500"
          }`}
          to="/akun"
        >
          Akun
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
