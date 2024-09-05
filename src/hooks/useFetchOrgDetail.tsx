'use client'
import { useEffect, useState } from "react";

interface OrgInfo {
    ORGCODE: string
    ORGNAME: string
    ADDR1: string
    ADDR2: string
    TEL: string
    LINEID: string
    EMAIL1: string
    TAXID: string
}

interface ApiDetailResponse {
    orgInfor: OrgInfo[];
    status: number;
}

const useFetchOrg = (refresh: boolean) => {
    const [reportDetail, setReportDetail] = useState<OrgInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/get-org-infor", { next: { revalidate: 10 } });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data: ApiDetailResponse = await response.json();

                if (!data.orgInfor || !Array.isArray(data.orgInfor)) {
                    throw new Error("orgInfor field is missing or not an array in the API response");
                }
            
                setReportDetail(data.orgInfor);
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error instanceof Error ? error.message : String(error));
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [refresh]);

    return { reportDetail, loading, error };
};

export default useFetchOrg;