import { useState, useEffect } from 'react';


interface IProductType {
    PT_ID: number;
    PT_NAME: string;
}

const useFetchProductTypes = (refresh: boolean) => {
    const [productTypes, setProductTypes] = useState<IProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/get-product-types", { next: { revalidate: 10 }});
                const { productTypes } = await response.json();
                setProductTypes(productTypes);
                setLoading(false);

            } catch (error) {
                console.error(error);
                setError(true);
            }
        };

        fetchData();
    }, [refresh]);

    return { productTypes, loading, error };
}

export default useFetchProductTypes;