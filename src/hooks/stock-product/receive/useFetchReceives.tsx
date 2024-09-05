"use client";
import type { Receive } from "@/app/model/receive.type";
import { useEffect, useState } from "react";



const useFetchReceives = (refresh: boolean) => {
    const [receives, setReceives] = useState<Receive[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(refresh)
        setIsLoading(true);
        const fetchReceive = async () => {
            try {
                const res = await fetch('/api/get-receives',{ next: { revalidate: 10 }});
                const { receives, status } = await res.json();
                setReceives(receives);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReceive();
    }, [refresh]);

    return { receives, isLoading, error };
}

export default useFetchReceives;