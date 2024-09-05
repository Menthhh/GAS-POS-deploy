"use client";
import { useEffect, useState } from "react";

interface Product {
  P_ID: string;
  P_NAME: string;
  P_TYPE: string;
  P_UNIT: string;
  P_UNIT_AMOUNT: number;
  P_STATUS: string;
  RETAIL_PRICE: number;
  WHOLE_PRICE: number;
  NOTIFICATION_AMOUNT: number;
  P_IMAGE: string;
}

const useFetchProducts = (refresh: boolean) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(refresh);
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/get-products", {
          next: { revalidate: 10 },
        });
        const { products } = await res.json();
        setProducts(products);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

  return { products, isLoading, error };
};

export default useFetchProducts;
