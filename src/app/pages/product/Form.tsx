"use client";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";

import { handleSubmit } from "./Action";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

interface ProductFormProps {
  toggleForm: () => void;
  isShowForm: boolean;
  setRefresh: any;
  units: any;
  types: any;
}

const ProductForm = ({
  toggleForm,
  isShowForm,
  setRefresh,
  units,
  types,
}: ProductFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setRefresh((prev) => !prev);
  }, [formRef]);

  const resetForm = () => {
    formRef.current?.reset();
    setSelectedFile(null);
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleReset = () => {
    formRef.current?.reset();
    setSelectedFile(null);
  };

  return (
    <form
      className="w-1/3 translate-x-3 bg-[#FAFDFF] rounded-tl-2xl shadow-lg border-2 border-[#E4E4E4] flex flex-col items-center pt-14 gap-5 custom-scrollbar overflow-y-auto max-h-[90vh] pb-36"
      ref={formRef}
      onSubmit={(e) => handleSubmit(e, selectedFile, setRefresh)}
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <div
          {...getRootProps()}
          id="fileInputDropzone"
          className="w-5/6 bg-white rounded-2xl h-[202px] border-2 border-[#4398E7] flex justify-center items-center"
        >
          <input
            {...getInputProps()}
            id="fileInput" // Add an id to the file input
          />

          <div className="flex flex-col justify-center items-center">
            {selectedFile ? (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="selected"
                width={100}
                height={100}
              />
            ) : (
              <>
                <Image
                  src="/images/image.png"
                  alt="plus"
                  width={50}
                  height={50}
                />
                <h1 className="text-secondary">วางไฟล์รูปภาพเพื่ออัปโหลด</h1>
              </>
            )}
          </div>
        </div>
        <button
          className="bg-[#347EC2] text-white px-4 py-2 rounded-lg drop-shadow-lg hover:bg-[#4398E7] hover:text-white"
          type="button"
          onClick={() => document.querySelector('input[type="file"]')?.click()}
        >
          <div className="flex justify-center items-center gap-2">
            <AddIcon />
            <p>เพิ่มรูปภาพ</p>
          </div>
        </button>
      </div>
      <div className="w-full self-start pr-4">
        <div className="flex justify-center items-center bg-[#0059AB] absolute left-0 rounded-t-3xl">
          <h1 className="text-md text-white font-bold px-5 py-4 -translate-y-2">
            ข้อมูลสินค้า
          </h1>
        </div>
        <div className="bg-white border-[1px] pb-7 border-[#E4E4E4] rounded-xl z-50 translate-y-9 flex flex-col items-center pt-4 gap-3">
          {/* <div className="flex">
            <h1>รหัสสินค้า :</h1>
            <h1 className="text-extra">#GS10659346 :</h1>
          </div> */}
          <span className="flex flex-col justify-start w-full px-10 ">
            <h1 className="text-extra font-bold"> ชื่อสินค้า </h1>
            <input
              type="text"
              className="w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="ชื่อสินค้า"
              name="productName"
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10">
            <h1 className="text-extra font-bold"> ประเภท </h1>
            <div className="relative">
              <select
                name="productType"
                id="productType"
                className="w-full text-secondary z-50 font-ibm-plex-sans-thai rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-5 focus:ring-primary focus:ring-2 cursor-pointer appearance-none"
              >
                <option value="" disabled selected>
                  ประเภท
                </option>
                {
                  types.map((type: any) => (
                    <option key={type.PT_ID} value={type.PT_NAME}>{type.PT_NAME}</option>
                  ))
                }
              </select>
              <Image
                src={"/images/arrow_down.png"}
                alt="Arrow Down"
                width={25}
                height={25}
                className="absolute right-0 top-0 mt-1.5 mr-3 cursor-pointer"
              />
            </div>
          </span>
        </div>
      </div>

      <div className="w-full self-start pr-4 mt-8 ">
        <div className="flex justify-center items-center bg-[#0059AB] absolute left-0 rounded-t-3xl">
          <h1 className="text-md text-white font-bold px-5 py-4 -translate-y-2">
            ข้อมูลสต็อกสินค้า
          </h1>
        </div>
        <div className="bg-white border-[1px] h-auto border-[#E4E4E4] rounded-xl z-50 translate-y-9 flex flex-col items-center py-6 gap-6 ">
          <span className="flex flex-col justify-start w-full px-10">
            <h1 className="text-extra font-bold"> หน่วย </h1>
            <div className="relative">
              <select
                name="unit"
                id="unit"
                className="w-full text-secondary z-50 font-ibm-plex-sans-thai rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-5 focus:ring-primary focus:ring-2 cursor-pointer appearance-none"
              >
                <option value="" disabled selected>
                  หน่วย
                </option>
                {units.map((unit: any) => (
                  <option key={unit.U_ID} value={unit.U_NAME}>
                    {unit.U_NAME}
                  </option>
                ))
                }
              </select>
              <Image
                src={"/images/arrow_down.png"}
                alt="Arrow Down"
                width={25}
                height={25}
                className="absolute right-0 top-0 mt-1.5 mr-3 cursor-pointer"
              />
            </div>
          </span>
          <span className="flex flex-col justify-start w-full px-10 -translate-y-2">
            <h1 className="text-extra font-bold"> จำนวนต่อหน่วย </h1>
            <input
              type="text"
              className="w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="จำนวนต่อหน่วย"
              name="unitAmount"
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10 -translate-y-2">
            <h1 className="text-extra font-bold"> ราคาขายปลีก </h1>
            <input
              type="text"
              className="w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="ราคาขายปลีก"
              name="retailPrice"
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10 -translate-y-2">
            <h1 className="text-extra font-bold"> ราคาขายส่ง </h1>
            <input
              type="text"
              className="w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="ราคาขายส่ง"
              name="wholesalePrice"
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10 -translate-y-2 gap-1">
            <h1 className="text-extra font-bold">
              <ErrorIcon
                width={20}
                height={20}
                className="text-extra -translate-y-0.5"
              />{" "}
              แจ้งเตือนสินค้าใกล้หมด {"( < น้อยกว่า )"}{" "}
            </h1>
            <input
              type="number"
              className="w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="5"
              name="notificationAmount"
            />
          </span>
        </div>
      </div>
      <span className="flex gap-8 translate-y-12">
        <button
          className="bg-[#F62626] w-[100px] h-[44.3px] text-white font-bold border-2 border-white hover:bg-red-800 hover:text-white rounded-lg drop-shadow-lg"
          type="button"
          onClick={handleReset}
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

export default ProductForm;
