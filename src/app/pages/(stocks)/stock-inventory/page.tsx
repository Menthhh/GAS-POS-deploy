"use client";

import Layout from "@/components/Layout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import add from "@/../public/images/add.png";
import excel from "@/../public/images/excel.png";
import customerInfoLogo from "@/../public/images/customerInfoLogo.png";
import ExportCSV from "@/components/ExportCSV";
import Link from "next/link";
import EditButton from "@/components/ui/EditButton";
import RemoveButton from "@/components/ui/RemoveButton";
import Swal from "sweetalert2";
import CustomTable from "@/components/CustomTable";
import DeleteAllButton from "@/components/ui/DeleteAllButton";
import DeleteSelectedButton from "@/components/ui/DeleteSelectedButton";
import useFetchReceive from "@/hooks/stock-product/receive/useFetchReceive";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import search from "@/../public/images/search.png";
import DeleteSelectedForm from "@/components/DeleteSelectedForm";
import DeleteAllForm from "@/components/DeleteAllForm";
import useFetchSuppliersHistory from "@/hooks/useFetchSupplierHistory";
import { inventorys, Inventory } from "./mock";
import Select from "react-select";
import { DropdownIndicator } from "@/components/DropdownIndicator";

const columnWidths = ["4%", "2%", "10%", "15%", "10%", "10%", "10%"];
const startColumns = [4];
const searchColumns = [2, 3];

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

function StockInventoryPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
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

  function formatDate(date) {
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

  const filterTypeData = (data: typeof inventorys) => {
    return data.filter((item) => {
      if (filterType === "") {
        return true;
      } else {
        return item.ptype === filterType;
      }
    });
  };

  const filteredTypeData: typeof inventorys = filterTypeData(inventorys);
  const data = {
    headers: [
      <input
        type="checkbox"
        onChange={(e) => {
          const checkboxes = document.querySelectorAll(
            'input[type="checkbox"]'
          );
          checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = e.target.checked;
          });
          if (e.target.checked) {
            setSelectedItems(inventorys.map((receieve) => receieve.REFNO));
          } else {
            setSelectedItems([]);
          }
        }}
        checked={selectedItems.length === inventorys.length}
      />,
      "ลำดับ",
      "รหัส",
      "รายการ",
      "ประเภท",
      "หน่วยนับ",
      "คงเหลือ",
    ],
    rows: filteredTypeData.map((item, index) => [
      <input type="checkbox" onChange={() => handleSelect(item.id)} />,
      index + 1,
      item.id,
      item.pname,
      item.ptype,
      item.utype,
      item.qty,
    ]),
  };

  return (
    <Layout currentPage="สต็อกสินค้า" subPage="สต็อกคงเหลือ">
      <div className="h-full w-full flex mt-5 gap-1">
        <div className="h-full w-full mx-auto flex flex-col gap-3">
          <div
            className="flex flex-row gap-4 w-full justify-center mt-2 bg-white py-10 rounded-2xl"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="relative flex items-center justify-between gap-6 w-full max-w-[500px]">
              <h1 className="text-extra font-bold text-xl">ค้นหาสินค้า</h1>
              <input
                value={searchQuery}
                type="text"
                className="flex w-full max-w-[370px] h-8 rounded-2xl ring-1 ring-[#878787] border-none py-2 px-3 focus:ring-primary focus:ring-2 "
                placeholder="ค้นหาโดยรหัสหรือชื่อรายการ"
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
            <div className="flex flex-row justify-center items-center ">
              <div className="min-w-[120px] max-h-[125px] relative">
                <Select
                  isSearchable={true}
                  components={{ DropdownIndicator }}
                  options={pTypeOptions}
                  value={
                    pTypeOptions.find(
                      (option) => option.value === filterType
                    ) || ""
                  }
                  onChange={(selectedOption) =>
                    setFilterType(selectedOption ? selectedOption.value : "")
                  }
                  placeholder={"ประเภท"}
                  className="text-secondary h-8  font-ibm-plex-sans-thai"
                  classNamePrefix="react-select"
                  styles={{
                    clearIndicator: (provided) => ({
                      ...provided,
                      padding: "0px",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: "0px",
                    }),
                    input: (provided) => ({
                      ...provided,
                      margin: "0px",
                    }),
                    indicatorSeparator: () => {},
                    control: (provided) => ({
                      ...provided,
                      borderWidth: "1px",
                      borderColor: "#878787",
                      borderRadius: "1rem",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#0c487f",
                      },
                      height: "35px",
                      minHeight: "35px",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#4398E7" : "white",
                      color: state.isFocused ? "white" : "black",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#878787",
                    }),
                  }}
                />
              </div>
              <button
                onClick={() => {
                  setFilterType("");
                  setSearchQuery("");
                }}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            </div>
          </div>
          <div
            className="tableShow bg-white px-4 h-full rounded-2xl flex flex-col pt-5 pb-3"
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
                  ข้อมูลสต็อกสินค้าคงเหลือทั้งหมด
                </h1>
              </div>
              <ExportCSV
                data={[]}
                fileName="receive"
                label="นำออกไฟล์ (Excel)"
              />
            </div>
            <CustomTable
              data={data}
              columnWidths={columnWidths}
              searchQuery={searchQuery}
              searchColumns={searchColumns}
              startColumns={[]}
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

export default StockInventoryPage;
