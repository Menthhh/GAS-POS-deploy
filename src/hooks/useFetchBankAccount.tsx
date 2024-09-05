'use client'
import { useEffect, useState } from "react";

interface BankAccount {
    ACCOUNT_ID: string;
    ACCOUNT_NUMBER: string;
    BANK_NAME: string;
    LOCATION: string;
    ACCOUNT_TYPE: string;
}

const useFetchBankAccount = (refresh: boolean) => {
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        const fetchBankAccount = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/get-accounts",  { next: { revalidate: 10 } });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const { accounts } = await response.json();
                setBankAccounts(accounts);
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBankAccount();
    }, [refresh]);

    return { bankAccounts, loading, error };
};

export default useFetchBankAccount;
