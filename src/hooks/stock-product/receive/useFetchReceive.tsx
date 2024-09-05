"use client"; 
import type { ReceiveInfo } from "@/app/pages/(stocks)/receive-edit-form/type/receiveInfo.type";
import { useEffect, useState } from "react";

const useFetchReceive = (refno: string, refresh: boolean) => {
    const [receive, setReceive] = useState<ReceiveInfo>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchReceive = async () => {
            try {
                const res = await fetch('/api/get-receive/'+refno,{ next: { revalidate: 10 }});
                const { receiveData, status } = await res.json();
                setReceive(receiveData);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

    fetchReceive();
  }, [refresh]);

  return { receive, isLoading, error };
};

export default useFetchReceive;
