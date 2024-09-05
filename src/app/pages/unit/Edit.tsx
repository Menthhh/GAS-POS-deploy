"use client";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";

import { handleSubmit } from "./Action";
import { useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Swal from "sweetalert2";

interface UnitEditFormProps {
    toggleForm: () => void;
    isShowForm: boolean;
    setRefresh: (value: boolean | ((prevValue: boolean) => boolean)) => void;
    editData: any;
}

const UnitEditForm = ({
    toggleForm,
    isShowForm,
    setRefresh,
    editData
}: UnitEditFormProps) => {

    const formRef = useRef<HTMLFormElement>(null);


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const body = {
            unitId: editData?.U_ID,
            unitName: e.target.unitName.value,
        };
        try {
            const response = await fetch("/api/update-unit", {
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
        } catch (error) {
            console.error(error);
            Swal.fire("ผิดพลาด", "อัพเดทข้อมูลไม่สำเร็จ", "error");
        }
    }

   

    return (
        <form
            className="z-50 w-1/3 translate-x-3 bg-[#FAFDFF] rounded-tl-2xl shadow-lg border-2 border-[#E4E4E4] flex flex-col items-center pt-14 gap-5 custom-scrollbar overflow-y-auto max-h-[90vh] pb-36"
            ref={formRef}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className="w-full self-start ">
                <div className="flex justify-center items-center bg-[#0059AB] absolute left-0 rounded-t-3xl">
                    <h1 className="text-md text-white font-bold px-5 py-4 -translate-y-2">
                        ข้อมูลหน่วยนับ
                    </h1>
                </div>

                <div className="bg-white border-[1px] pb-12 border-[#E4E4E4] rounded-xl z-50 translate-y-9 flex flex-col items-center pt-5 gap-6">
                    <div className="flex flex-col gap-2 justify-start items-center">
                        <h1 className="">แก้ไขหข้อมูลหน่วยนับ</h1>
                        <p>รหัสหข้อมูลหน่วยนับ: {editData?.U_ID}</p>
                    </div>
                    <span className="flex flex-col justify-start w-full px-10">
                        <h1 className="text-extra font-bold"> ข้อมูลหน่วยนับ </h1>
                        <input
                            type="text"
                            className="bg-textInput w-full rounded-xl ring-1 ring-[#878787] border-none py-1.5 px-3 focus:ring-primary focus:ring-2"
                            placeholder="ข้อมูลหน่วยนับ"
                            name="unitName"
                            defaultValue={editData?.U_NAME}
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

export default UnitEditForm;
