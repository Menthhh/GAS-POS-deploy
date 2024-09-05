import { useState, useEffect } from 'react';


const useFetchUnitsTypes = (refresh:any) => {
    const [units, setUnits] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/get-unit-type',{ next: { revalidate: 10 }});
                const {units, productTypes} = await res.json();
                setUnits(units);
                setTypes(productTypes);
                
            } catch (error:any) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [refresh]);

    return { units, types, loading, error };
}

export default useFetchUnitsTypes;