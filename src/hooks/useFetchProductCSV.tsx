'use client'
import { useEffect, useState } from "react";


const useFetchProductCSV = (refresh: boolean) => {
    const [productCSV, setProductCSV] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchProductCSV = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/export-product-csv",{ next: { revalidate: 10 }});
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const { products } = await response.json();
                setProductCSV(products);
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProductCSV();
    }, [refresh]);

    return { productCSV, loading, error };
}

export default useFetchProductCSV;