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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import search from "@/../public/images/search.png";
import DeleteSelectedForm from "@/components/DeleteSelectedForm";
import DeleteAllForm from "@/components/DeleteAllForm";
import useFetchCustomers from "@/hooks/useFetchCustomers";

// "CCODE": "C001",
// "CNAME": "John",
// "ORG_ADDR": "1234 Elm St Apt 101",
// "CONTACT": "John",
// "TEL": "1234567890",
// "TYPE1": "TypeA"

const columnWidths = ["3%", "5%", "5%", "12%", "10%", "10%", "5%", "5%", "15%"];
const startColumns: number[] = [];
const searchColumns: number[] = [2, 3];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  outline: "none",
};

function ProductEditPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShowDeleteOne, setIsShowDeleteOne] = useState(false);
  const [isShowDeleteAll, setIsShowDeleteAll] = useState(false);
  const [deleteOneconfirm, setDeleteOneConfirm] = useState(false);
  const [deleteAllconfirm, setDeleteAllConfirm] = useState(false);
  const { customers } = useFetchCustomers(refresh);

  console.log(customers);

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
      const response = await fetch("/api/delete-all-customers", {
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
      const response = await fetch("/api/delete-customer", {
        method: "DELETE",
        body: JSON.stringify({ customerIds: selectedItems }),
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

  const handleDelete = async (customerIds: string) => {
    try {
      const response = await fetch("/api/delete-customer", {
        method: "DELETE",
        body: JSON.stringify({ customerIds: [customerIds] }),
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

  const handleSelect = (customerIds: string) => {
    if (selectedItems.includes(customerIds)) {
      setSelectedItems((prev) => prev.filter((item) => item !== customerIds));
    } else {
      setSelectedItems((prev) => [...prev, customerIds]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
            setSelectedItems(customers.map((customer) => customer.CCODE));
          } else {
            setSelectedItems([]);
          }
        }}
        checked={selectedItems.length === customers.length}
      />,
      "ลำดับ",
      "เลขที่",
      "ชื่อ",
      "ที่อยู่",
      "ผู้ติดต่อ",
      "โทรศัพท์",
      "ประเภท",
      "",
    ],
    rows: customers.map((customer, index) => [
      <input type="checkbox" onChange={() => handleSelect(customer.CCODE)} />,
      index + 1,
      customer.CCODE,
      customer.CNAME,
      customer.ORG_ADDR,
      customer.CONTACT,
      customer.TEL,
      customer.TYPE1,
      <div className="flex gap-8 justify-center">
        <Link
          href={{
            pathname: "/pages/customer-form",
            query: { ccode: customer.CCODE },
          }}
        >
          <EditButton label="แก้ไข" onClick={() => {}} />
        </Link>
        <RemoveButton label="ลบ" onClick={() => handleDelete(customer.CCODE)} />
      </div>,
    ]),
  };

  return (
    <Layout currentPage="ลูกค้า" subPage="ข้อมูลลูกค้า">
      <div className="h-full w-full flex mt-3 gap-1">
        <div className="h-full w-full mx-auto flex flex-col gap-3">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="flex justify-center gap-20 pt-2 text-textExtra ">
              <Link
                href="/pages/customer-form"
                className="flex flex-col gap-2 justify-center items-center"
              >
                <div
                  className="bg-white hover:drop-shadow-xl cursor-pointer shadow-lg w-[80px] h-[80px] rounded-2xl border-solid border-primary border-4 flex justify-center items-center "
                  onClick={() => {}}
                >
                  <Image src={add} width={50} height={50} alt="" />
                </div>
                <p className="font-bold">เพิ่มข้อมูล</p>
              </Link>
            </div>
            <div className="relative flex items-center justify-between gap-6 w-full max-w-[500px]">
              <h1 className="text-extra font-bold text-xl">ค้นหาลูกค้า</h1>
              <input
                type="text"
                className="flex w-full max-w-[370px] h-8 rounded-2xl ring-1 ring-[#878787] border-none py-2 px-3 focus:ring-primary focus:ring-2 "
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

export default ProductEditPage;