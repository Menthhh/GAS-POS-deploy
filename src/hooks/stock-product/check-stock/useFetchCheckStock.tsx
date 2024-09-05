"use client";
import { useEffect, useState } from "react";

interface CheckStock {
    REENO: string;
    DATE: string;
}

const useFetchCheckStock = (refresh: boolean) => { 
    const [checkStock, setCheckStock] = useState<CheckStock[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusAPI, setStatusAPI] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/get-Improve-product', { next: { revalidate: 10 }});
                const { checkStockData, status } = await res.json();
                
                console.warn(status);
                setStatusAPI(status);
                setCheckStock(checkStockData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [refresh]);
    return { checkStock, statusAPI, loading, error };
}

export default useFetchCheckStock;
