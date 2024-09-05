"use client";

import Layout from "@/components/Layout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import add from "@/../public/images/add.png";
import excel from "@/../public/images/excel.png";
import customerInfoLogo from "@/../public/images/customerInfoLogo.png";
import ExportCSV from "@/components/ExportCSV";
import Swal from "sweetalert2";
import DeleteAllButton from "@/components/ui/DeleteAllButton";
import DeleteSelectedButton from "@/components/ui/DeleteSelectedButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import search from "@/../public/images/search.png";
import DeleteSelectedForm from "@/components/DeleteSelectedForm";
import DeleteAllForm from "@/components/DeleteAllForm";
import Select from "react-select";
import { DropdownIndicator } from "@/components/DropdownIndicator";
import { StockCard, stockCards } from "./mock";
import StockCardTable from "./component/stockCardTable";

const columnWidths = ["5%", "10%", "10%", "10%", "5%", "5%", "5%", "5%"];
const startColumns = [4];
const searchColumns = [1, 3];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  outline: "none",
};

const P_TYPE: string[] = ["แก๊ส", "น้ำมัน", "ของกิน"];
const pTypeOptions = P_TYPE.map((type) => ({
  value: type,
  label: type,
}));

function StockCardPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState({
    fromDate: "",
    toDate: formatDate(new Date()),
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
  }, [deleteOneconfirm, deleteAllconfirm]);

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
      const response = await fetch("/api/delete-all-receives-products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        closeDeleteAll();
        setSelectedItems([]);
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        setRefresh((prev) => !prev);
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          (checkbox as HTMLInputElement).checked = false;
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ลบไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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
      const response = await fetch("/api/delete-receive-product", {
        method: "DELETE",
        body: JSON.stringify({ receiveId: selectedItems }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        closeDeleteOne();
        setSelectedItems([]);
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        setRefresh((prev) => !prev);
      } else {
        Swal.fire({
          icon: "error",
          title: "ลบไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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

  const handleDelete = async (receiveId: string) => {
    try {
      const response = await fetch("/api/delete-receive-product", {
        method: "DELETE",
        body: JSON.stringify({ receiveId: [receiveId] }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setRefresh((prev) => !prev);
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ลบไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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

  const filterAndSortDataByDate = (data: typeof stockCards) => {
    return data
      .filter((item) => {
        if (!dateFilter.fromDate && !dateFilter.toDate) return true;

        const itemDate = thaiDateToJSDate(item.date);

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
        return true;
      })
      .sort((a, b) => {
        const dateA = thaiDateToJSDate(a.date);
        const dateB = thaiDateToJSDate(b.date);
        return dateB.getTime() - dateA.getTime(); // Descending order
      });
  };

  const filteredData: typeof stockCards = filterAndSortDataByDate(stockCards);
  const tableData = {
    headers: [
      "ลำดับ",
      "เลขที่เอกสาร",
      "วันที่",
      "รายการ",
      "ยกมา",
      "รับ",
      "ขาด",
      "คงเหลือ",
    ],
    rows: filteredData.map((stockcard, index) => [
      (index + 1).toString(),
      stockcard.refno,
      stockcard.date,
      stockcard.raikarn,
      stockcard.yokma,
      stockcard.rub,
      stockcard.khard,
      stockcard.left,
    ]),
  };

  return (
    <Layout currentPage="สต็อกสินค้า" subPage="สต็อกการ์ด">
      <div className="h-full w-full flex mt-2 gap-1">
        <div className="h-full w-full mx-auto flex flex-col gap-4">
          <div
            className="flex flex-col gap-4 w-full items-center justify-center mt-3 bg-white py-5 rounded-2xl"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="relative flex items-row justify-between gap-4 w-full max-w-[550px]">
              <h1 className="text-extra font-bold text-xl">ค้นหาเลขที่</h1>
              <input
                type="text"
                className="flex w-full max-w-[420px] h-8 rounded-2xl ring-1 ring-[#878787] border-none py-2 px-3 focus:ring-primary focus:ring-2 "
                placeholder="ค้นหา"
                onChange={(e) => handleSearch(e)}
              />
              <Image
                src={search}
                width={50}
                height={50}
                alt="Search"
                className="absolute right-0 -top-1 mt-2 mr-3 size-[25px] cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between w-full max-w-[550px] gap-6">
              <h1 className="text-extra font-bold text-xl"> วันที่ </h1>
              <input
                placeholder="จากวันที่"
                type="date"
                name="date"
                value={dateFilter.fromDate}
                onChange={(e) =>
                  handleDateFilterChange("fromDate", e.target.value)
                }
                className="w-max text-secondary bg-white font-ibm-plex-sans-thai border-none ring-[1px] rounded-2xl ring-[#878787] py-1 px-5 focus:ring-primary hover:ring-primary cursor-pointer "
              />
              <h1 className="text-extra font-bold text-xl"> ถึง </h1>
              <input
                type="date"
                name="date"
                value={dateFilter.toDate}
                onChange={(e) =>
                  handleDateFilterChange("toDate", e.target.value)
                }
                className="w-max  text-secondary bg-white font-ibm-plex-sans-thai border-none ring-[1px] rounded-2xl ring-[#878787] py-1 px-5 focus:ring-primary hover:ring-primary cursor-pointer "
              />
            </div>
          </div>

          <div
            className="bg-white px-10 h-full rounded-2xl flex flex-col py-4"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="flex justify-between items-center gap-3 px-2">
              <div className="flex justify-between items-center gap-4">
                <h1 className="text-end font-bold text-2xl">
                  รายงานสต็อกการ์ด
                </h1>
              </div>
              <ExportCSV
                data={[]}
                fileName="receive"
                label="นำออกไฟล์ (Excel)"
              />
            </div>
            <p className="px-2 py-2 text-extra font-semibold">
              ประจำเดือน <span className="text-textExtra">{" Month "}</span> ปี{" "}
              <span className="text-textExtra"> {" Year "} </span>
            </p>
            <StockCardTable
              data={tableData}
              columnWidths={columnWidths}
              searchQuery={searchQuery}
              searchColumns={searchColumns}
              startColumns={startColumns}
            />
            {/* {selectedItems.length > 0 && (
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
            </Modal> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default StockCardPage;
