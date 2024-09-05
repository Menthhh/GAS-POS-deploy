"use client";
import { useEffect, useState } from "react";

interface ReceiveTank {
    MYEAR: string;
    MONTH: number;
    REFNO: string;
    RDATE: string;
    TDATE: string;
    S_ID: string;
    TOTAL: number;
    // Receive Tank Dt
    // REENO: string;
    P_CODE: string;
    QTY: number;
    U_PRICE: number;
    AMT: number;
}


const useFetchReceiveTank = (refresh: boolean) => {
    const [receiveTankData, setReceiveTankData] = useState<ReceiveTank[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusAPI, setStatusAPI] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/get-receive-tank', { next: { revalidate: 10 } });
                const { receiveTankData, status } = await res.json();
                console.warn(status);
                setStatusAPI(status);
                setReceiveTankData(receiveTankData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [refresh]);

    return { receiveTankData, statusAPI, loading, error };
}

export default useFetchReceiveTank;
