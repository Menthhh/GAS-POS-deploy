import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DropdownIndicator } from "@/components/DropdownIndicator";
import Swal from "sweetalert2";
import PaymentsIcon from "@mui/icons-material/Payments";
import { saveSwal } from "./components/SaveSwal";
import { useRouter } from "next/navigation";

function LoanCreditForm({ customerId, setPage, day1, setDay }) {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (day1 === null) {
      return Swal.fire({
        icon: "error",
        title: "ไม่สามารถเว้นว่างได้",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(day1);
    try {
      // First, check if the customer exists
      const checkResponse = await fetch(
        `/api/get-customer?ccode=${customerId}`
      );
      console.log(checkResponse.ok);

      if (checkResponse.ok) {
        const { customer } = await checkResponse.json();
        const exists = customer;
        const method = exists ? "PATCH" : "POST";
        const url = exists
          ? "/api/update-customer"
          : "/api/create-new-customer";

        console.log(method, url);

        const response = await fetch(url, {
          method: method,
          body: JSON.stringify({ ccode: customerId, day1 }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          await saveSwal(router);
        } else {
          console.error("Error:", await response.text());
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fieldDivStyle = "flex gap-5 w-full max-w-[720px] flex-row items-center";
  const textFieldStyle = "flex-1 text-extra font-bold text-end";
  const inputStyle =
    "w-full max-w-[600px] text-[#0c487f] bg-white font-ibm-plex-sans-thai border-none ring-[1px] rounded-lg ring-[#878787] py-1 px-5 focus:ring-primary hover:ring-primary cursor-pointer ";

  return (
    <>
      <div
        className="flex flex-col bg-white rounded-2xl px-3 py-8"
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex flex-row gap-3 px-4 items-center">
          <div className="rounded-full h-[70px] w-[70px] bg-[#B1D8FB] p-2">
            <PaymentsIcon className="h-full w-full" sx={{ color: "#ffff" }} />
          </div>
          <div className="flex flex-col">
            <p className="text-third font-semibold">ข้อมูลเงินเชื่อและเครดิต</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center py-5">
          <div className={`${fieldDivStyle} justify-between`}>
            <p className={textFieldStyle}> จำนวนวัน </p>
            <input
              s
              type="number"
              name="dayAmout"
              placeholder="จำนวนวัน"
              value={day1}
              onChange={(e) => {
                setDay(e.target.value);
              }}
              className={inputStyle}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-7">
        <button
          type="submit"
          className="bg-white text-textExtra py-2 px-10 text-lg rounded-lg border-2 border-[#0059AB] border-none font-semibold font-ibm-plex-sans-thai mt-3"
          onClick={() => setPage(2)}
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          ย้อนกลับ
        </button>
        <button
          type="submit"
          className="bg-[#0059AB] py-2 px-10 text-lg rounded-lg border-2 border-white border-none text-white font-semibold font-ibm-plex-sans-thai mt-3"
          onClick={handleSubmit}
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          บันทึก
        </button>
      </div>
    </>
  );
}

export default LoanCreditForm;
