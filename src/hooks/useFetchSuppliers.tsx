import { useEffect, useState } from "react";

const useFetchSuppliers = (refresh : boolean) => { 
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const res = await fetch('/api/get-suppliers',{ next: { revalidate: 10 }});
                const { suppliers } = await res.json();
                setSuppliers(suppliers);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, [refresh]);

    return { suppliers, loading, error };
}

export default useFetchSuppliers;