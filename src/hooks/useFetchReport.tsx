import { useEffect, useState, useCallback } from "react";

interface Report {
    RDATE: string;
    REFNO: string;
    S_NAME: string;
    S_TAX_ID: string; 
    TOTAL: number;
    VAMT: number;
    PRODUCTS?: any[]; // Add this if PRODUCTS is part of the report item
}

interface ApiDataResponse {
    REPORT: Report[];
    status: number;
}

const useFetchReport = (searchState: any, reportType: string, refresh: boolean) => {
    const [report, setReport] = useState<Report[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const apiMapper = {
        tax: 'get-tax-report',
        receive: 'get-receive-product-report'
    };

    const expandReportItems = useCallback((reportItems: Report[]) => {
        return reportItems.flatMap(item =>
            (item.PRODUCTS || []).map((product, index) => ({
                RDATE: index === 0 ? item.RDATE : null,
                REFNO: index === 0 ? item.REFNO : null,
                S_NAME: index === 0 ? item.S_NAME : null,
                TOTAL: index === 0 ? item.TOTAL : null,
                VAMT: index === 0 ? item.VAMT : null,
                GTOTAL: index === 0 ? (item as any).GTOTAL : null,
                DIFF1: index === 0 ? (item as any).DIFF1 : null,
                GTOTAL1: (item as any).GTOTAL1,
                P_NAME: product.P_NAME,
                QUANTITY: product.QUANTITY,
                UPRICE: product.UPRICE,
                TOTAL_AMOUNT: product.TOTAL_AMOUNT
            }))
        );
    }, []);

    const fetchReport = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/${apiMapper[reportType]}`, { next: { revalidate: 10 } });
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
    }, [reportType]);

    useEffect(() => {
        fetchReport();
    }, [fetchReport, refresh]);

    return { 
        report: report,
        loading, 
        error,
        refetch: fetchReport
    };
};

export default useFetchReport;