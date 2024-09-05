import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import StoreIcon from "@mui/icons-material/Store";
import { saveSwal } from "./components/SaveSwal";
import { useRouter } from "next/navigation";
function OrganizationForm({
  customerId,
  organizationForm,
  setOrganizationForm,
  onOrganizationFormChange,
  setPage,
}) {
  const router = useRouter();''
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      organizationForm.org_name === "" ||
      organizationForm.org_addr1 === "" ||
      organizationForm.refno === "" ||
      organizationForm.taxid === ""
    ) {
      return Swal.fire({
        icon: "error",
        title: "ไม่สามารถเว้นว่างได้",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log({ ccode: customerId, ...organizationForm });
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
          body: JSON.stringify({ ccode: customerId, ...organizationForm }),
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

  const handleChange = (field, value) => {
    setOrganizationForm((prevState) => ({ ...prevState, [field]: value }));
  };

  useEffect(() => {
    onOrganizationFormChange(organizationForm);
  }, [organizationForm, onOrganizationFormChange]);

  const fieldDivStyle =
    "flex gap-5 w-full max-w-[830px] flex-row justify-between items-center";
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
            <StoreIcon className="h-full w-full" sx={{ color: "#ffff" }} />
          </div>
          <div className="flex flex-col">
            <p className="text-third font-semibold">ข้อมูลผู้ติดต่อ</p>
            <p className="text-secondary">โปรดระบุข้อมูล</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center py-5">
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> ชื่อสถานประกอบการ </p>
            <input
              type="text"
              name="org_name"
              placeholder="ชื่อสถานประกอบการ"
              value={organizationForm.org_name}
              onChange={(e) => {
                handleChange("org_name", e.target.value);
              }}
              className={inputStyle}
            />
          </div>
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> ที่อยู่ </p>
            <input
              type="text"
              name="adress"
              placeholder="ที่อยู่"
              value={organizationForm.org_addr1}
              onChange={(e) => {
                handleChange("org_addr1", e.target.value);
              }}
              className={inputStyle}
            />
          </div>
          <div className={fieldDivStyle}>
            <div />
            <input
              type="text"
              name="org_addr2"
              placeholder="ที่อยู่เพิ่มเติม"
              value={organizationForm.org_addr2}
              onChange={(e) => {
                handleChange("org_addr2", e.target.value);
              }}
              className={`${inputStyle}`}
            />
          </div>
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> เลขที่ ธพ.กจ.2 </p>
            <input
              type="text"
              name="refno"
              placeholder="เลขที่ ธพ.กจ.2"
              value={organizationForm.refno}
              onChange={(e) => {
                handleChange("refno", e.target.value);
              }}
              className={inputStyle}
            />
          </div>
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> เลขประจำตัวผู้เสียภาษีอากร </p>
            <input
              placeholder="เลขประจำตัวผู้เสียภาษีอากร"
              type="text"
              name="taxid"
              value={organizationForm.taxid}
              onChange={(e) => {
                handleChange("taxid", e.target.value);
              }}
              className={inputStyle}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-7">
        <button
          type="submit"
          className="bg-white  text-textExtra py-2 px-10 text-lg rounded-lg border-2 border-[#0059AB] border-none font-semibold font-ibm-plex-sans-thai mt-3"
          onClick={() => setPage(0)}
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

export default OrganizationForm;
