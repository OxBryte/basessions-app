import { useState, useEffect } from "react";
import axios from "axios";

const useTransactionHistory = (address) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) return;

      setIsLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_BASESCAN_API_KEY; // Make sure this is set correctly
      const url = `https://api-sepolia.basescan.org/api`;

      try {
        const response = await axios.get(url, {
          params: {
            module: "account",
            action: "txlist",
            address: address,
            startblock: 0,
            endblock: 99999999,
            sort: "desc",
            apikey: apiKey,
          },
        });

        if (
          response.data.status === "1" &&
          Array.isArray(response.data.result)
        ) {
          setTransactions(response.data.result);
        } else {
          throw new Error(
            response.data.message || "Failed to fetch transactions"
          );
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [address]);

  return { transactions, isLoading, error };
};

export default useTransactionHistory;
