"use client";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Swal from "sweetalert2";

interface UserEditFormProps {
  toggleForm: () => void;
  isShowForm: boolean;
  setRefresh: any;
  editData: any;
}

const UserEditForm = ({
  toggleForm,
  isShowForm,
  setRefresh,
  editData,

}: UserEditFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = editData?.USER_ID;
    const fullName = e.currentTarget.fullName.value;
    const workerType = e.currentTarget.workerType.value;
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("fullName", fullName);
    formData.append("workerType", workerType);
    formData.append("username", username);
    formData.append("password", password);

    const fileInput = selectedFile
    if(fileInput && fileInput.name) {
        formData.append("file", fileInput);
    }else{
        formData.append("file", null);
    }
    
    console.log(selectedFile)
    console.log(userId)
    console.log(fullName)
    console.log(workerType)
    console.log(username)
    console.log(password)

    try {
        const response = await fetch(`/api/update-user`, {
            method: "PUT",
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            Swal.fire("สำเร็จ", "อัพเดทข้อมูลสำเร็จ", "success");
            setRefresh((prev) => !prev);
        } else {
            Swal.fire("ผิดพลาด", "อัพเดทข้อมูลไม่สำเร็จ", "error");
        }
    }catch (error) {
        console.error(error);
        Swal.fire("ผิดพลาด", "อัพเดทข้อมูลไม่สำเร็จ", "error");
    }
}
  return (
    <form
      className="w-1/3 translate-x-3 bg-[#FAFDFF] rounded-tl-2xl shadow-lg border-2 border-[#E4E4E4] flex flex-col items-center pt-14 gap-5 custom-scrollbar overflow-y-auto max-h-[90vh] pb-36"
      ref={formRef}
      onSubmit={(e) => handleSubmit(e)}
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
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="selected"
                width={100}
                height={100}
              />
            ) : (
              <>
                <img
                  src={editData?.PROFILE_IMG}
                  alt="plus"
                  width={100}
                  height={100}
                />
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
            ข้อมูลพนักงาน
          </h1>
        </div>
        <div className="bg-white border-[1px] pb-7 border-[#E4E4E4] rounded-xl z-50 translate-y-9 flex flex-col items-center pt-4 gap-3">
          {/* <div className="flex">
            <h1>รหัสสินค้า :</h1>
            <h1 className="text-extra">#GS10659346 :</h1>
          </div> */}
          <span className="flex flex-col justify-start w-full px-10 ">
            <h1 className="text-extra font-bold"> ชื่อ-นามสกุล </h1>
            <input
              type="text"
              className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="ชื่อ-นามสกุล"
              name="fullName"
              defaultValue={editData?.FULL_NAME}
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10 ">
            <h1 className="text-extra font-bold"> ประเภทพนักงาน </h1>
            <input
              type="text"
              className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="ประเภทพนักงาน"
              name="workerType"
              defaultValue={editData?.WORKER_TYPE}
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10 ">
            <h1 className="text-extra font-bold"> Username </h1>
            <input
              type="text"
              className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="Username"
              name="username"
              defaultValue={editData?.USERNAME}
            />
          </span>
          <span className="flex flex-col justify-start w-full px-10 ">
            <h1 className="text-extra font-bold"> Password </h1>
            <input
              type="text"
              className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
              placeholder="Password"
              name="password"
              defaultValue={editData?.PASSWORD}
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

export default UserEditForm;