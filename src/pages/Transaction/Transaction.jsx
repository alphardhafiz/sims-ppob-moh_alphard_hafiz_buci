import { useEffect, useState } from "react";
import NameBalanceSection from "../../components/NameBalanceSection";
import transactionService from "../../service/transactionService";
import formatNumber from "../../utils/formatNumber";
import formatDate from "../../utils/formatDate";

const Transaction = () => {
  const [limit, setLimit] = useState(5);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await transactionService.getHistory({ limit });
        setHistories(res.data.data.records);
      } catch (error) {
        console.log({ error });
      }
    };
    getHistory();
  }, [limit]);
  return (
    <div className="flex flex-col gap-10 px-24">
      <NameBalanceSection />
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Semua Transaksi</h2>
        {histories.map((history) => (
          <div
            key={history.invoice_number}
            className="flex justify-between items-center py-4 border border-gray-200 mb-2 p-3"
          >
            <div>
              <p
                className={`text-lg font-bold ${
                  history.transaction_type === "TOPUP"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {history.transaction_type === "TOPUP" ? "+" : "-"} Rp
                {formatNumber(history.total_amount)}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(history.created_on)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{history.description}</p>
              <p className="text-xs text-gray-500">
                {history.transaction_type === "TOPUP"
                  ? "Top Up Saldo"
                  : "Pembayaran"}
              </p>
            </div>
          </div>
        ))}
         <div className="flex justify-center mt-6 mb-10">
          <button 
            onClick={() => setLimit(prevLimit => prevLimit + 5)} 
            className="px-4 py-2 text-red-500 font-semibold rounded-md hover:bg-red-50 transition-colors duration-300"
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
