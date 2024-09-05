
import { useEffect, useState } from "react";

const useFetchUnits = (refresh : boolean) => {
    const [units, setUnits] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const res = await fetch('/api/get-units',{ next: { revalidate: 10 }});
                const data = await res.json();
                setUnits(data.units);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUnits();
    }, [refresh]);

    return { units, isLoading, error };
}

export default useFetchUnits;