import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useRouter } from "next/navigation";
import { saveSwal } from "./components/SaveSwal";

function ShippingForm({
  customerId,
  organizationForm,
  shippingForm,
  onShippingFormChange,
  setPage,
}) {
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (shippingForm.send_addr1 === "") {
      return Swal.fire({
        icon: "error",
        title: "ไม่สามารถเว้นว่างได้",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(shippingForm);

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
          body: JSON.stringify({
            ccode: customerId,
            send_addr1: shippingForm.send_addr1,
            send_addr2: shippingForm.send_addr2,
          }),
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
    onShippingFormChange({ ...shippingForm, [field]: value });
  };

  const handleCheckboxChange = (e) => {
    const useOrganizationAddress = e.target.checked;

    onShippingFormChange({
      ...shippingForm,
      useOrganizationAddress,
      send_addr1: useOrganizationAddress ? organizationForm.org_addr1 : "",
      send_addr2: useOrganizationAddress ? organizationForm.org_addr2 : "",
    });
  };

  useEffect(() => {
    if (shippingForm.useOrganizationAddress) {
      onShippingFormChange({
        ...shippingForm,
        send_addr1: organizationForm.org_addr1,
        send_addr2: organizationForm.org_addr2,
      });
    }
  }, [organizationForm, shippingForm.useOrganizationAddress]);

  const fieldDivStyle = "flex gap-5 w-full max-w-[720px] flex-row items-center";
  const textFieldStyle = "flex-1 text-extra font-bold text-end";
  const inputStyle = `
    w-full max-w-[600px] 
    text-[#0c487f] 
    bg-white 
    font-ibm-plex-sans-thai 
    border-none 
    ring-[1px] 
    rounded-lg 
    ring-[#878787] 
    py-1 
    px-5 
    focus:ring-primary 
    hover:ring-primary 
    cursor-pointer
    disabled:bg-gray-100
    disabled:text-gray-500
    disabled:cursor-not-allowed
    disabled:ring-gray-300
  `;
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
            <LocalShippingIcon
              className="h-full w-full"
              sx={{ color: "#ffff" }}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-third font-semibold">ข้อมูลการจัดส่ง</p>
            <p className="text-secondary">โปรดระบุข้อมูล</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center py-5">
          <div className={`${fieldDivStyle} justify-end`}>
            <label className="w-full max-w-[600px] gap-2 text-third">
              <input
                type="checkbox"
                checked={shippingForm.useOrganizationAddress}
                onChange={handleCheckboxChange}
                className="rounded-full mr-2"
              />
              ใช้ที่อยู่เดียวกับสถานประกอบการ
            </label>
          </div>
          <div className={`${fieldDivStyle} justify-between`}>
            <p className={textFieldStyle}> สถานที่จัดส่ง </p>
            <input
              type="text"
              name="send_addr1"
              placeholder="ที่อยู่"
              value={shippingForm.send_addr1}
              onChange={(e) => handleChange("send_addr1", e.target.value)}
              className={inputStyle}
              disabled={shippingForm.useOrganizationAddress}
            />
          </div>
          <div className={`${fieldDivStyle} justify-end`}>
            <input
              type="text"
              name="send_addr2"
              placeholder="ที่อยู่เพิ่มเติม"
              value={shippingForm.send_addr2}
              onChange={(e) => handleChange("send_addr2", e.target.value)}
              className={inputStyle}
              disabled={shippingForm.useOrganizationAddress}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-7">
        <button
          type="button"
          className="bg-white text-textExtra py-2 px-10 text-lg rounded-lg border-2 border-[#0059AB] border-none font-semibold font-ibm-plex-sans-thai mt-3"
          onClick={() => setPage(1)}
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

export default ShippingForm;
