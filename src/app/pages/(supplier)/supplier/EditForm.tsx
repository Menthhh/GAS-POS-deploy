"use client";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";

import { useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Swal from "sweetalert2";

interface SupplierEditFormProps {
  toggleForm: () => void;
  isShowForm: boolean;
  setRefresh: any;
  editData: any;
}

const SupplierEditForm = ({
  toggleForm,
  isShowForm,
  setRefresh,
  editData,
}: SupplierEditFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setRefresh((prev) => !prev);
  }, [formRef]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supplierId = editData?.S_ID;
    const supplierName = e.currentTarget.supplierName.value;
    const supplierContactName = e.currentTarget.supplierContactName.value;
    const supplierAddress = e.currentTarget.supplierAddress.value;
    const supplierPhone = e.currentTarget.supplierPhone.value;
    const supplierTaxId = e.currentTarget.supplierTaxId.value;

    const body = {
      supplierId,
      supplierName,
      supplierContactName,
      supplierAddress,
      supplierPhone,
      supplierTaxId,
    };

    console.log("body", body);

    try {
      const response = await fetch("/api/update-supplier", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire("สำเร็จ", "เพิ่มสินค้าสำเร็จ", "success");
        setRefresh((prev) => !prev);
      } else {
        Swal.fire("ผิดพลาด", "เพิ่มสินค้าไม่สำเร็จ", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("ผิดพลาด", "เพิ่มสินค้าไม่สำเร็จ", "error");
    }
  };
  return (
    <form
      className="w-1/3 translate-x-3 bg-[#FAFDFF] rounded-tl-2xl shadow-lg border-2 border-[#E4E4E4] flex flex-col items-center pt-14 gap-5 custom-scrollbar overflow-y-auto max-h-[90vh] pb-36"
      ref={formRef}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="w-full self-start pr-4">
        <div className="flex justify-center items-center bg-[#0059AB] absolute left-0 rounded-t-3xl">
          <h1 className="text-md text-white font-bold px-5 py-4 -translate-y-2">
            ข้อมูลผู้จัดจำหน่าย
          </h1>
        </div>
        <div className="bg-white border-[1px] pb-7 border-[#E4E4E4] rounded-xl z-50 translate-y-9 flex flex-col items-center pt-4 gap-5">
          <span className="flex flex-col justify-start w-full px-10 ">
            <h1 className="text-extra font-bold"> ชื่อ </h1>
            <input
              type="text"
              className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="ชื่อ"
              name="supplierName"
              defaultValue={editData?.S_NAME}
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10 ">
            <h1 className="text-extra font-bold"> ชื่อผู้ติดต่อ </h1>
            <input
              type="text"
              className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="ชื่อผู้ติดต่อ"
              name="supplierContactName"
              defaultValue={editData?.S_CONTACT_NAME}
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10">
            <h1 className="text-extra font-bold">ที่อยู่</h1>
            <textarea
              className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2 h-20"
              placeholder="ที่อยู๋"
              name="supplierAddress"
              defaultValue={editData?.S_ADDRESS}
              style={{ maxHeight: "100px", maxWidth: "100%" }}
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10">
            <h1 className="text-extra font-bold">โทรศัพท์</h1>
            <input
              className="bg-textInput first-letter:w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="โทรศัพท์"
              name="supplierPhone"
              defaultValue={editData?.S_TEL}
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10">
            <h1 className="text-extra font-bold">เลขประจำตัวผู้เสียอากร</h1>
            <input
              className="bg-textInput *:w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="เลขประจำตัวผู้เสียอากร"
              name="supplierTaxId"
              defaultValue={editData?.S_TAX_ID}
            />
          </span>
        </div>
      </div>
      <span className="flex gap-8 translate-y-12">
        <button
          className="bg-[#F62626] w-[100px] h-[44.3px] text-white font-bold border-2 border-white hover:bg-red-800 hover:text-white rounded-lg drop-shadow-lg"
          type="button"
          onClick={toggleForm}
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="bg-[#0059AB] w-[100px] h-[44.3px] text-white font-bold border-2 border-white hover:bg-blue-800 hover:text-white rounded-lg drop-shadow-lg"
        >
          บันทึก
        </button>
      </span>
    </form>
  );
};

export default SupplierEditForm;
