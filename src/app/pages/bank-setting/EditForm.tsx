"use client";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";

import { handleSubmit } from "./Action";
import { useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Swal from "sweetalert2";

interface BankFormProps {
    toggleForm: () => void;
    isShowForm: boolean;
    setRefresh: (value: boolean | ((prevValue: boolean) => boolean)) => void;
    editData: any;
}

const BankFormEdit = ({
    toggleForm,
    isShowForm,
    setRefresh,
    editData
}: BankFormProps) => {

    const formRef = useRef<HTMLFormElement>(null);

    const handleReset = () => {
        formRef.current?.reset();
    };

    const handleSubmitEdit = async (e: any) => {
        e.preventDefault();

        const body = {
            ACCOUNT_NUMBER: editData?.ACCOUNT_ID,
            BANK_NAME: e.target.bankName.value,
            LOCATION: e.target.location.value,
            ACCOUNT_TYPE: e.target.accountType.value,
        };
        try {
            const response = await fetch("/api/update-account", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),

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
            onSubmit={(e) => handleSubmitEdit(e)}
        >
            <div className="w-full self-start ">
                <div className="flex justify-center items-center bg-[#0059AB] absolute left-0 rounded-t-3xl">
                    <h1 className="text-md text-white font-bold px-5 py-4 -translate-y-2">
                        ข้อมูลบัญชีธนาคาร
                    </h1>
                </div>
                <div className="bg-white border-[1px] pb-12 border-[#E4E4E4] rounded-xl z-50 translate-y-9 flex flex-col items-center pt-5 gap-6">
                    <div className="flex flex-col gap-2 justify-start items-center">
                        <h1 className="">แก้ไขบัญชีธนาคาร</h1>
                        <p>เลขบัญชีธนาคาร: {editData?.ACCOUNT_ID}</p>
                    </div>
                    <span className="flex flex-col justify-start w-full px-10">
                        <h1 className="text-extra font-bold"> ชื่อธนาคาร </h1>
                        <input
                            type="text"
                            className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
                            placeholder="ชื่อธนาคาร"
                            name="bankName"
                            defaultValue={editData?.BANK_NAME}
                        />
                    </span>
                    <span className="flex flex-col justify-start w-full px-10">
                        <h1 className="text-extra font-bold"> สาขา </h1>
                        <input
                            type="text"
                            className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
                            placeholder="สาขา"
                            name="location"
                            defaultValue={editData?.LOCATION}
                        />
                    </span>
                    <span className="flex flex-col justify-start w-full px-10">
                        <h1 className="text-extra font-bold"> ประเภท </h1>
                        <div className="relative">
                            <select
                                name="accountType"
                                id="accountType"
                                defaultValue={editData?.ACCOUNT_TYPE}
                                className="bg-textInput w-full text-secondary z-50 font-ibm-plex-sans-thai rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-5 focus:ring-primary focus:ring-2 cursor-pointer appearance-none"
                            >
                                <option selected value="ประเภท">
                                    ประเภท
                                </option>
                                <option value="ออมทรัพย์">ออมทรัพย์</option>
                                <option value="กระแสรายวัน">กระแสรายวัน</option>
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

export default BankFormEdit;
