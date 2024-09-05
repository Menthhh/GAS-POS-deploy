'use client'
import { useEffect, useState } from "react";


const useFetchSupplierCSV = (refresh: boolean) => {
    const [supplierCSV, setSupplierCSV] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchProductCSV = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/export-supplier-csv" ,{ next: { revalidate: 10 }});
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const { suppliersCSV } = await response.json();
                console.log(suppliersCSV);
                setSupplierCSV(suppliersCSV);
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProductCSV();
    }, [refresh]);

    return { supplierCSV, loading, error };
}

export default useFetchSupplierCSV;