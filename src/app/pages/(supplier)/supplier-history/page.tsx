"use client";

import Layout from "@/components/Layout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import add from "@/../public/images/add.png";
import excel from "@/../public/images/excel.png";
import customerInfoLogo from "@/../public/images/customerInfoLogo.png";
import ExportCSV from "@/components/ExportCSV";
import Swal from "sweetalert2";
import CustomTable from "@/components/CustomTable";
import search from "@/../public/images/search.png";
import DeleteAllButton from "@/components/ui/DeleteAllButton";
import DeleteSelectedButton from "@/components/ui/DeleteSelectedButton";
import DeleteAllForm from "@/components/DeleteAllForm";
import DeleteSelectedForm from "@/components/DeleteSelectedForm";
import { Box, Modal } from "@mui/material";
import {
  HistorySupplier,
  mockData,
} from "@/app/pages/(supplier)/supplier-history/__mock__/historyData";
import useFetchSuppliersHistory from "@/hooks/useFetchSupplierHistory";
const columnWidths: string[] = [
  "3%",
  "3%",
  "8%",
  "10%",
  "20%",
  "15%",
  "5%",
  "5%",
  "5%",
];
const startColumns: number[] = [];
const searchColumns: number[] = [3];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  outline: "none",
};

function RecievePage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { historySupplier } = useFetchSuppliersHistory(refresh);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState({
    fromDate: formatDate(new Date()), // Default start date to today
    toDate: "", // No end date set by default
  });
  const [isShowDeleteOne, setIsShowDeleteOne] = useState(false);
  const [isShowDeleteAll, setIsShowDeleteAll] = useState(false);
  const [deleteOneconfirm, setDeleteOneConfirm] = useState(false);
  const [deleteAllconfirm, setDeleteAllConfirm] = useState(false);


  useEffect(() => {
    if (deleteOneconfirm) {
      setSelectedItems([]);
      setDeleteOneConfirm(false);
      handleDeleteOne();
      //uncheck all checkboxes
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = false;
      });
    } else if (deleteAllconfirm) {
      setDeleteAllConfirm(false);
      handleDeleteAll();
      setSelectedItems([]);
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = false;
      });
    }
  }, []);

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSelect = (recieveId: string) => {
    if (selectedItems.includes(recieveId)) {
      setSelectedItems((prev) => prev.filter((item) => item !== recieveId));
    } else {
      setSelectedItems((prev) => [...prev, recieveId]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDateFilterChange = (field: string, value: string) => {
    const newDateFilter = { ...dateFilter, [field]: value };
    setDateFilter(newDateFilter);

    // Only compare if both dates are set
    if (newDateFilter.fromDate && newDateFilter.toDate) {
      const fromDate = new Date(newDateFilter.fromDate);
      const toDate = new Date(newDateFilter.toDate);

      if (fromDate > toDate || toDate < fromDate) {
        Swal.fire({
          icon: "error",
          title: "ช่วงวันที่ไม่ถูกต้อง",
          // text: 'วันที่เริ่มต้นต้องไม่มาหลังวันที่สิ้นสุด',
          confirmButtonText: "ตกลง",
        });
        // Optionally, reset the field that was just changed
        setDateFilter({ ...newDateFilter, [field]: "" });
      }
    }
  };

  const thaiDateToJSDate = (thaiDate: string): Date => {
    const [day, month, thaiYear] = thaiDate.split("/");
    const gregorianYear = parseInt(thaiYear) - 543;
    return new Date(`${gregorianYear}-${month}-${day}`);
  };

  const filterAndSortHistoryByDate = (data: typeof historySupplier) => {
    return data
      .filter((item) => {
        const itemDate = thaiDateToJSDate(item.DATE);
        const fromDate = dateFilter.fromDate
          ? thaiDateToJSDate(dateFilter.fromDate)
          : null;
        const toDate = dateFilter.toDate
          ? thaiDateToJSDate(dateFilter.toDate)
          : null;

        if (fromDate && toDate) {
          return itemDate >= fromDate && itemDate <= toDate;
        } else if (fromDate) {
          return itemDate >= fromDate;
        } else if (toDate) {
          return itemDate <= toDate;
        }
        return true; // If no date filter is set, return all items
      })
      .sort((a, b) => {
        const dateA = thaiDateToJSDate(a.DATE);
        const dateB = thaiDateToJSDate(b.DATE);
        return dateB.getTime() - dateA.getTime(); // Descending order
      });
  };

  const filteredHistory = filterAndSortHistoryByDate(historySupplier);
  const data = {
    headers: [

      "ลำดับ",
      "เลขที่บิล",
      "ชื่อผู้จัดจำหน่าย",
      "วันที่",
      "สินค้า",
      "จำนวน",
      "ต่อหน่วย",
      "ราคาเงินรวม",
    ],
    rows: filteredHistory.map((item, index) => [
      
      index + 1,
      item.BILL_NUMBER,
      item.S_NAME,
      item.DATE,
      item.P_NAME,
      item.QUANTITY,
      item.UPRICE,
      item.TOTAL,
    ]),
  };

  const openDeleteOne = () => {
    setIsShowDeleteOne(true);
  };

  const closeDeleteOne = () => {
    setIsShowDeleteOne(false);
  };

  const openDeleteAll = () => {
    setIsShowDeleteAll(true);
  };

  const closeDeleteAll = () => {
    setIsShowDeleteAll(false);
  };

  const handleDeleteAll = async () => {
    try {
      // const response = await fetch("/api/delete-all-receives-products", {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // if (response.ok) {
      //   closeDeleteAll();
      //   setSelectedItems([]);
      //   Swal.fire({
      //     icon: "success",
      //     title: "ลบสำเร็จ",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      //   setRefresh((prev) => !prev);
      //   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      //   checkboxes.forEach((checkbox) => {
      //     (checkbox as HTMLInputElement).checked = false;
      //   });
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "ลบไม่สำเร็จ",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "ลบไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDeleteOne = async () => {
    try {
      // const response = await fetch("/api/delete-receive-product", {
      //   method: "DELETE",
      //   body: JSON.stringify({ receiveId: selectedItems }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // if (response.ok) {
      //   closeDeleteOne();
      //   setSelectedItems([]);
      //   Swal.fire({
      //     icon: "success",
      //     title: "ลบสำเร็จ",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      //   setRefresh((prev) => !prev);
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "ลบไม่สำเร็จ",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "ลบไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const historySupplierCSV = historySupplier.map(supplier => ({
    "เลขที่บิล": supplier.BILL_NUMBER,
    "ชื่อผู้จัดจำหน่าย": supplier.S_NAME,
    "วันที่": supplier.DATE,
    "ชื่อสินค้า": supplier.P_NAME,
    "จำนวน": supplier.QUANTITY,
    "ราคาต่อหน่วย": supplier.UPRICE,
    "ราคารวม": supplier.TOTAL
}));


  return (
    <Layout currentPage="ผู้จัดจำหน่าย" subPage="ประวัติการซื้อ">
      <div className="h-full w-full flex mt-6 gap-1">
        <div className="h-full w-full mx-auto flex flex-col gap-3">
          <div
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
            className="flex flex-col justify-center items-center gap-7 bg-white py-8 h-fit rounded-2xl"
          >
            <div className="relative flex items-center gap-6 w-full max-w-[600px]">
              <h1 className="text-extra font-bold text-xl">
                ค้นหาผู้จัดจำหน่าย
              </h1>
              <input
                type="text"
                className="flex w-full max-w-[400px] h-[36px] rounded-2xl ring-1 ring-[#878787] border-none py-2 px-3 focus:ring-primary focus:ring-2 "
                placeholder="ค้นหา"
                onChange={(e) => handleSearch(e)}
              />
              <Image
                src={search}
                width={50}
                height={50}
                alt="Search"
                className="absolute right-2 -top-1 mt-2 mr-6 size-[25px] cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between w-full max-w-[500px]">
              <h1 className="text-extra font-bold text-xl"> วันที่ </h1>
              <input
                placeholder="จากวันที่"
                type="date"
                name="date"
                value={dateFilter.fromDate}
                onChange={(e) =>
                  handleDateFilterChange("fromDate", e.target.value)
                }
                className="w-max h-[36px] text-secondary bg-white font-ibm-plex-sans-thai border-none ring-[1px] rounded-2xl ring-[#878787] py-1 px-5 focus:ring-primary hover:ring-primary cursor-pointer "
              />
              <h1 className="text-extra font-bold text-xl"> ถึง </h1>
              <input
                type="date"
                name="date"
                value={dateFilter.toDate}
                onChange={(e) =>
                  handleDateFilterChange("toDate", e.target.value)
                }
                className="w-max h-[36px] text-secondary bg-white font-ibm-plex-sans-thai border-none ring-[1px] rounded-2xl ring-[#878787] py-1 px-5 focus:ring-primary hover:ring-primary cursor-pointer "
              />
            </div>
          </div>
          <div
            className="tableShow bg-white px-4 h-full rounded-2xl flex flex-col py-5"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="flex justify-between items-center gap-4 px-2">
              <div className="flex justify-between items-center gap-4 ">
                <Image
                  src={customerInfoLogo}
                  width={50}
                  height={50}
                  alt="Customer Info"
                  className="object-cover size-[50px]"
                />
                <h1 className="text-secondary font-bold text-xl">
                  ข้อมูลรับสินค้าทั้งหมด
                </h1>
              </div>
              <ExportCSV
                data={historySupplierCSV}
                fileName="ประวัติการซื้อ"
                label="นำออกไฟล์ (Excel)"
              />
            </div>
            <CustomTable
              data={data}
              columnWidths={columnWidths}
              searchQuery={searchQuery}
              searchColumns={searchColumns}
              startColumns={startColumns}
            />
            {selectedItems.length > 0 && (
              <div className="buttomPanel flex gap-8 justify-center items-center -translate-y-8">
                <DeleteAllButton onClick={openDeleteAll} />
                <DeleteSelectedButton onClick={openDeleteOne} />
              </div>
            )}
            <Modal open={isShowDeleteAll} onClose={closeDeleteAll}>
              <Box sx={style}>
                <DeleteAllForm
                  setIsShowDeleteAll={setIsShowDeleteAll}
                  setDeleteAllConfirm={setDeleteAllConfirm}
                  rows={data.rows}
                />
              </Box>
            </Modal>
            <Modal open={isShowDeleteOne} onClose={closeDeleteOne}>
              <Box sx={style}>
                <DeleteSelectedForm
                  setIsShowDeleteOne={setIsShowDeleteOne}
                  setDeleteOneConfirm={setDeleteOneConfirm}
                  selectedItems={selectedItems}
                />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RecievePage;
