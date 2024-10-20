import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NameBalanceSection from "../../components/NameBalanceSection";
import transactionService from "../../service/transactionService";
import { CheckCircle, XCircle } from "lucide-react";
import Logo from "../../assets/Logo.png";
import formatNumber from "../../utils/formatNumber";
import { useDispatch, useSelector } from "react-redux";
import { subtractBalance } from "../../redux/slices/balanceSlice";

const Pembayaran = () => {
  const { service_code } = useParams();
  const service = useSelector((state) => state.services.services).filter((service) => service.service_code === service_code)[0]
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "pending",
    data: '',
  });
  useEffect(() => {
    if(service){
        setAmount(service.service_tariff)
    }
  }, [service])
  const handleTopUp = async () => {
    setLoading(true);
    try {
      const res = await transactionService.transaction({ service_code });
      setModalContent({ type: "success", data: res.data.data });
      dispatch(subtractBalance(service.service_tariff))
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
  };
  return (
    <div className="flex flex-col gap-10 px-24 relative">
      <NameBalanceSection />
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-lg text-gray-500 font-bold">Pembayaran</h2>
        <div className="flex gap-3">
            <img src={service?.service_icon} className="w-8 h-8" alt="" />
        <h2 className="text-xl font-semibold">{service?.service_name}</h2>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-1 flex-col mr-4">
          <input
            type="text"
            value={service?.service_tariff||0}
            readOnly
            onChange={(e) => setAmount(e.target.value)}
            placeholder="masukan nominal pembayaran"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={() => {
              setShowModal(true);
              setModalContent({ type: "pending", amount });
            }}
            disabled={loading}
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md text-white disabled:bg-gray-300 transition duration-300"
          >
            {loading ? "Bayar..." : "Top Up"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[25%]">
            {modalContent.type === "success" ? (
              <>
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                <h3 className="mb-2">Pembayaran {service?.service_name} sebesar</h3>
                <p className="text-2xl font-bold mb-4">
                  Rp{formatNumber(amount)}
                </p>
                <p className="font-semibold mb-4">berhasil!</p>
              </>
            ) : modalContent.type === "failed" ? (
              <>
                <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                <h3 className="mb-2">Pembayaran {service?.service_name} sebesar</h3>
                <p className="text-2xl font-bold mb-4">
                  Rp{formatNumber(amount)}
                </p>
                <p className="font-semibold mb-4">gagal!</p>
              </>
            ) : (
              <>
                <img src={Logo} className="mx-auto mb-4 h-12 w-12" alt="" />
                <h3 className="mb-2">
                Bayar {service?.service_name} sebesar
                </h3>
                <p className="text-2xl font-bold mb-4">
                  Rp{formatNumber(amount)}
                </p>
                <button
                  onClick={handleTopUp}
                  className="text-red-500 font-bold block mx-auto hover:underline"
                >
                  Ya, lanjutkan bayar
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

export default Pembayaran;
