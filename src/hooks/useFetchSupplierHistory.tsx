"use client";
import { useEffect, useState } from "react";

interface HistorySupplier {
  BILL_NUMBER: string;
  S_NAME: string;
  DATE: string;
  P_NAME: string;
  QUANTITY: string;
  UPRICE: string;
  TOTAL: string;
}

const useFetchSuppliersHistory = (refresh: boolean) => {
  const [historySupplier, setSuppliersHistory] = useState<HistorySupplier[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(refresh);
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch("/api/get-history-buy", {
          next: { revalidate: 10 },
        });
        const { historySupplier, status } = await res.json();
        setSuppliersHistory(historySupplier);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  return { historySupplier, loading, error };
};

export default useFetchSuppliersHistory;
