'use client'
import { useEffect, useState } from "react";

interface Report {
    RDATE: string;
    REFNO: string;
    S_NAME: string;
    S_TAX_ID: string; 
    TOTAL: number;
    VAMT: number;
}
interface orgInfor {
    ORGCODE:string
    ORGNAME:string
    ADDR1:string
    ADDR2:string
    TEL:string
    LINEID:string
    EMAIL1:string
    TAXID:string

    
}


interface ApiDataResponse {
    REPORT: Report[];
    status: number;
}


const useFetchReport = (refresh: boolean) => {
    const [report, setReport] = useState<Report[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/get-tax-report", { next: { revalidate: 10 } });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data: ApiDataResponse = await response.json();
                
                if (!data.REPORT) {
                    throw new Error("REPORT field is missing in the API response");
                }
                
                setReport(data.REPORT);
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error instanceof Error ? error.message : String(error));
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [refresh]);
    return { report, loading, error };
};

export default useFetchReport;