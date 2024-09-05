"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ThemeProvider, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import theme from "@/theme";
import ReportSearch from "./ReportSearch";
import ReceiveTable from "./ReceiveTable";
import useFetchReport from "@/hooks/useFetchReport";
import useFetchOrg from "@/hooks/useFetchOrgDetail";
import { ReportTab } from "@/enum";
import dayjs from "dayjs";

const thaiMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const subPages = {
  "tax":"ภาษีซื้อ",
  "receive":"รับสินค้า",
  "saleBill":"งานขาย",
  "loanVendor":"ใบยืมถัง",
  "stockRemain":"สต็อกสินค้า"

}

type SearchState = {
  year: string | null;
  month: string | null;
  startDate: Date | null;
  endDate: Date | null;
  vendor: string | null; // Add this line
};
type Report = {
  RDATE: string;
  PRODUCTS?: any[];
  REFNO?: string;
  S_NAME?: string;
  TOTAL?: number;
  VAMT?: number;
  GTOTAL?: number;
  DIFF1?: number;
  GTOTAL1?: number;
};

function ReportPage({searchParams} : any) {
  const reportType =
    (searchParams.type as ReportTab) || ReportTab.RECEIVE;
  const [currentPage, setCurrentPage] = useState(1);
  const [vendors, setVendors] = useState([]);
  const itemsPerPage = 10;
  const [searchState, setSearchState] = useState<SearchState>({
    year: null,
    month: null,
    startDate: null,
    endDate: null,
    vendor: null, // Add this line
  });

  const { report, loading, error, refetch } = useFetchReport(
    { year: searchState.year, month: searchState.month },
    reportType
  );

  const { reportDetail } = useFetchOrg(false);

  const expandReportItems = useCallback((reportItems: Report[]) => {
    return reportItems.flatMap((item) =>
      (item.PRODUCTS || []).map((product, index) => ({
        RDATE: index === 0 ? item.RDATE : null,
        REFNO: index === 0 ? item.REFNO : null,
        S_NAME: index === 0 ? item.S_NAME : null,
        TOTAL: index === 0 ? item.TOTAL : null,
        VAMT: index === 0 ? item.VAMT : null,
        GTOTAL: index === 0 ? item.GTOTAL : null,
        DIFF1: index === 0 ? item.DIFF1 : null,
        GTOTAL1: item.GTOTAL1,
        P_NAME: product.P_NAME,
        QUANTITY: product.QUANTITY,
        UPRICE: product.UPRICE,
        TOTAL_AMOUNT: product.TOTAL_AMOUNT,
      }))
    );
  }, []);

  function filterArrayByDateRange(
    array: Report[],
    startDate: Date | null,
    endDate: Date | null
  ) {
    return array.filter((item) => {
      const [day, month, year] = item.RDATE.split("/");
      const itemDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );

      if (startDate && endDate) {
        return itemDate >= startDate && itemDate <= endDate;
      } else if (startDate) {
        return itemDate >= startDate;
      } else if (endDate) {
        return itemDate <= endDate;
      }
      return true;
    });
  }
  const filterData = useCallback(
    (data: Report[], searchState: SearchState) => {
      return data.filter((item) => {
        const [day, month, year] = item.RDATE.split("/");
        const itemDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );
        let yearMatch = true;
        let monthMatch = true;
        let vendorMatch = true; // Add this line

        if (searchState.year !== null && searchState.year !== "") {
          yearMatch = itemDate.getFullYear() === parseInt(searchState.year);
        }

        if (searchState.month !== null) {
          const monthIndex = thaiMonths.indexOf(searchState.month);
          monthMatch = itemDate.getMonth() === monthIndex;
        }

        if (searchState.vendor !== null && searchState.vendor !== "") {
          vendorMatch = item.S_NAME === searchState.vendor;
        }
        return yearMatch && monthMatch && vendorMatch; // Include vendorMatch in the return statement
      });
    },
    [reportType]
  );
  function getUniqueVendors(data) {
    return [
      ...new Set(
        data.filter((item: { S_NAME: null; }) => item.S_NAME != null).map((item) => item.S_NAME)
      ),
    ];
  }
  const filteredReport = useMemo(() => {
    if (!report) return { data: [], totalPages: 0 };

    let filteredData = filterData(report, searchState);

    if (
      reportType === "receive" &&
      searchState.startDate &&
      searchState.endDate
    ) {
      filteredData = filterArrayByDateRange(
        filteredData,
        searchState.startDate,
        searchState.endDate
      );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (reportType === "receive") {
      filteredData = expandReportItems(filteredData);
    }
    setVendors(getUniqueVendors(report));
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedData = filteredData.slice(startIndex, endIndex);

    paginatedData;

    return { data: paginatedData, totalPages };
  }, [
    report,
    searchState,
    filterData,
    reportType,
    expandReportItems,
    currentPage,
  ]);
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, filteredReport.totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleSearch = () => {
    refetch();
  };

  const exportExcelHandler = () => {
    // Implement Excel export logic
  };

  const exportPDFHandler = () => {
    // Implement PDF export logic
  };

  useEffect(() => {
    refetch();
  }, [reportType, refetch]);
  console.log(subPages[reportType])
  return (
    <Layout currentPage="รายงาน" subPage={subPages[reportType] || "unknown"}>
      <ThemeProvider theme={theme}>
        <ReportSearch
          refetch={handleSearch}
          vendors={vendors}
          setSearchState={setSearchState}
          searchState={searchState}
          type={reportType}
        />
        <ReceiveTable
          reportDetail={reportDetail[0]}
          searchState={searchState}
          ReportSelect={reportType}
          startDate={
            searchState.startDate
              ? dayjs(searchState.startDate).format("DD/MM/YYYY")
              : ""
          }
          endDate={
            searchState.endDate
              ? dayjs(searchState.endDate).format("DD/MM/YYYY")
              : ""
          }
          data={filteredReport}
          exportPDFHandler={exportPDFHandler}
          exportExcelHandler={exportExcelHandler}
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </ThemeProvider>

    </Layout>
  );
}

export default ReportPage;
