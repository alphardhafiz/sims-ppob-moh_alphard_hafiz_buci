import { useState } from "react";
import NameBalanceSection from "../../components/NameBalanceSection";
import transactionService from "../../service/transactionService";
import { Banknote, CheckCircle, XCircle } from "lucide-react";
import Logo from "../../assets/Logo.png";
import formatNumber from "../../utils/formatNumber";
import { useDispatch } from "react-redux";
import { setBalance } from "../../redux/slices/balanceSlice";

const TopUp = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "pending",
    data: "",
  });

  const quickAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
  };

  const handleTopUp = async () => {
    setLoading(true);
    try {
      const res = await transactionService.topup({ top_up_amount: +amount });
      setModalContent({ type: "success", data: res.data.data });
      dispatch(setBalance(res.data.data.balance));
      setShowModal(true);
    } catch (error) {
      console.log(error);
      setModalContent({ type: "failed", data: error.response.data.message });
      setShowModal(true);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setAmount("");
  };

  return (
    <div className="flex flex-col gap-10 px-24 relative">
      <NameBalanceSection />
      <div className="flex-1 flex flex-col">
        <div className="mb-2"></div>
        <h2 className="text-lg text-gray-500 font-bold">Silahkan masukan</h2>
        <h2 className="text-3xl font-bold">Nominal Top Up</h2>
      </div>
      <div className="flex">
        <div className="flex flex-1 flex-col mr-4">
          <div className="relative">
            <Banknote
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="masukan nominal Top Up"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md mb-4"
            />
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setModalContent({ type: "pending", amount });
            }}
            disabled={!amount || loading}
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md text-white disabled:bg-gray-300 transition duration-300"
          >
            {loading ? "Top Up..." : "Top Up"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {quickAmounts.map((value) => (
            <button
              key={value}
              onClick={() => handleQuickAmount(value)}
              className="py-2 px-4 bg-white text-gray-700 hover:bg-gray-300 border border-black"
            >
              Rp{formatNumber(value)}
            </button>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[25%]">
            {modalContent.type === "success" ? (
              <>
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold mb-2">Top Up sebesar</h3>
                <p className="text-2xl font-bold mb-4">
                  Rp{formatNumber(amount)}
                </p>
                <p className="font-semibold mb-4">berhasil!</p>
              </>
            ) : modalContent.type === "failed" ? (
              <>
                <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                <h3 className="text-xl font-bold mb-2">Top Up sebesar</h3>
                <p className="text-2xl font-bold mb-4">
                  Rp{formatNumber(amount)}
                </p>
                <p className="font-semibold mb-4">gagal!</p>
              </>
            ) : (
              <>
                <img src={Logo} className="mx-auto mb-4 h-12 w-12" alt="" />
                <h3 className="text-xl font-bold mb-2">
                  Anda yakin Top Up sebesar
                </h3>
                <p className="text-2xl font-bold mb-4">
                  Rp{formatNumber(amount)}
                </p>
                <button
                  onClick={handleTopUp}
                  className="text-red-500 hover:underline font-bold block mx-auto"
                >
                  Ya, lanjutkan Top Up
                </button>
              </>
            )}
            <button
              onClick={closeModal}
              className={`${
                modalContent.type === "pending"
                  ? "text-gray-400"
                  : "text-red-600"
              } font-semibold hover:underline`}
            >
              {modalContent.type === "pending"
                ? "Batalkan"
                : "Kembali ke Beranda"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUp;
